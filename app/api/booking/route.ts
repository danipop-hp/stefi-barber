import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nume, telefon, email, serviciu, data, ora } = body;

    if (!email || !nume) {
      return NextResponse.json(
        { success: false, error: 'Completati toate câmpurile obligatorii.' },
        { status: 400 }
      );
    }

    // Trimiterea email-ului de confirmare către client
    await resend.emails.send({
      from: 'Barbershop <onboarding@resend.dev>',
      to: email,
      subject: `Confirmare Programare - ${serviciu || 'Tuns'}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f0f0f; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; border: 1px solid #222;">
          <h2 style="color: #e5c158; margin-top: 0;">Programare Confirmată!</h2>
          <p>Salut, <strong>${nume}</strong>!</p>
          <p>Programarea ta a fost înregistrată cu succes. Detaliile tale sunt mai jos:</p>
          
          <div style="background-color: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;">✂️ <strong>Serviciu:</strong> ${serviciu || 'Nespecificat'}</p>
            <p style="margin: 5px 0;">📅 <strong>Data:</strong> ${data || 'Alesă'}</p>
            <p style="margin: 5px 0;">⏰ <strong>Ora:</strong> ${ora || 'Alesă'}</p>
            <p style="margin: 5px 0;">📞 <strong>Telefon:</strong> ${telefon}</p>
          </div>

          <p style="font-size: 13px; color: #aaa;">Dacă dorești să modifici sau să anulezi programarea, te rugăm să ne contactezi direct.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email trimis cu succes!' });
  } catch (error) {
    console.error('Eroare Resend:', error);
    return NextResponse.json(
      { success: false, error: 'A apărut o eroare la trimitere.' },
      { status: 500 }
    );
  }
}