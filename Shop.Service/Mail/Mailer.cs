using Shop.Service.Models;
using System;
using System.Net.Mail;

namespace Shop.Service.Mail
{
    public static class Mailer
    {
        private static readonly string EmailAddress = "shopservicetestmail@gmail.com";
        private static readonly string EmailPassword = "MailPassword123";



        public static void SendRegisterMail(this User user, MailTypes mailType, string token)
        {
            MailMessage mail = user.GetMailMessage();

            mail.Subject = "Stworzono konto w serwisie Shop!";
            mail.Body = $"Witaj, {user.Username}";
            mail.Body += Environment.NewLine;
            mail.Body += "Potwierdz swoj adres email klikajac w ponizszy link:";
            mail.Body += Environment.NewLine;
            mail.Body += $"http://localhost:3000/verifyaccount?Bearer={token}";

            Send(mail);
        }



        private static void Send(MailMessage mail)
        {
            using (var client = Client())
            {
                client.Send(mail);
            }
        }

        private static SmtpClient Client()
        {
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);

            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = EmailAddress,
                Password = EmailPassword
            };

            smtpClient.EnableSsl = true;
            System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                    System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                    System.Security.Cryptography.X509Certificates.X509Chain chain,
                    System.Net.Security.SslPolicyErrors sslPolicyErrors)
            {
                return true;
            };

            return smtpClient;
        }

        private static MailMessage GetMailMessage(this User user)
        {
            return new MailMessage(EmailAddress, user.EmailAddress);
        }
    }
}