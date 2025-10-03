import transporter from "../lib/email.js";

const EnviarMensaje = async (UserEmail, UserName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: UserEmail,
        subject: "Bienvenido a Maptv",
        html: `
            <h1>Holaa, ${UserName}</h1>
            <p>Bienvenido a Maptv. Gracias por registrarte en nuestra plataforma.</p>
            <div style="text-align: center;">
            <a href="http://localhost:3000/index.html" style="background-color: #00ffc4; color: #0b0c0f; padding: 10px 20px; text-decoration: none; border-radius: 5px; center;">
                Ir a la página de inicio
            </a>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el email:", error);
    }
};

export default EnviarMensaje;