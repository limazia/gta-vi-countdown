import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Verifica a autenticação
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const token = authHeader.split(' ')[1];
    const expectedToken = process.env.REVALIDATE_TOKEN;
    
    if (token !== expectedToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }), 
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verifica o segredo na query string como segunda camada de segurança
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const path = searchParams.get('path') || '/api/og';

    if (secret !== process.env.REVALIDATE_SECRET) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid secret' }), 
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Revalida o caminho
    revalidatePath(path);

    return new NextResponse(
      JSON.stringify({
        revalidated: true,
        now: Date.now(),
        path
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    const error = err as Error;
    return new NextResponse(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}