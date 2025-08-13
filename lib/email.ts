import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const isResendConfigured = () => {
  return !!process.env.RESEND_API_KEY
}

interface SendEmailParams {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  if (!resend) {
    throw new Error("Resend is not configured")
  }

  const fromAddress = process.env.RESEND_FROM || "Old to Sold <cyril@old2sold.com>"

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      text,
      html: html || text.replace(/\n/g, "<br>"),
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Email sending failed:", error)
    throw error
  }
}

export function generateConsignmentEmail(data: {
  name: string
  email: string
  phone?: string
  itemTitle: string
  condition: string
  method: string
  payload: any
}) {
  const subject = `New Consignment Submission: ${data.itemTitle}`

  const text = `
New consignment submission received:

Customer Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || "Not provided"}

Item Details:
- Title: ${data.itemTitle}
- Condition: ${data.condition}
- Pickup/Drop-off: ${data.method}

Full submission data:
${JSON.stringify(data.payload, null, 2)}

Please respond to the customer within 2-3 business days.
`

  const html = `
<h2>New Consignment Submission</h2>

<h3>Customer Information:</h3>
<ul>
  <li><strong>Name:</strong> ${data.name}</li>
  <li><strong>Email:</strong> ${data.email}</li>
  <li><strong>Phone:</strong> ${data.phone || "Not provided"}</li>
</ul>

<h3>Item Details:</h3>
<ul>
  <li><strong>Title:</strong> ${data.itemTitle}</li>
  <li><strong>Condition:</strong> ${data.condition}</li>
  <li><strong>Method:</strong> ${data.method}</li>
</ul>

<h3>Full Submission:</h3>
<pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;">
${JSON.stringify(data.payload, null, 2)}
</pre>

<p><em>Please respond to the customer within 2-3 business days.</em></p>
`

  return { subject, text, html }
}
