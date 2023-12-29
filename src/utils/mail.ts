export function sendMail({
  content,
  recipient,
  subject,
}: {
  recipient: string;
  subject: string;
  content: string;
}) {
  const a = document.createElement("a");
  // Make the subject and content URL safe
  subject = encodeURIComponent(subject);
  content = encodeURIComponent(content);
  a.href = `mailto:${recipient}?subject=${subject}&body=${content}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
