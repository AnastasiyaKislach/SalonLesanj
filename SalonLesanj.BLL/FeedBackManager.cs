using System;
using System.Net;
using System.Net.Mail;
using SalonLesanj.BusinessContracts;
using System.Web.Configuration;

namespace SalonLesanj.BLL {
	public class FeedBackManager : IFeedBackManager {

		private readonly string smtpServer = WebConfigurationManager.AppSettings["smtpServer"];
		private readonly int port = Int32.Parse(WebConfigurationManager.AppSettings["smtpPort"]);
		private readonly string caption = WebConfigurationManager.AppSettings["caption"];
		private readonly string mailto = WebConfigurationManager.AppSettings["mailto"];
		private readonly string from = WebConfigurationManager.AppSettings["from"];
		private readonly string password = WebConfigurationManager.AppSettings["password"];

		public void FeedBackForm(string name, string email, string message) {
			try {
				MailMessage mail = new MailMessage() {
					From = new MailAddress(from),
					To = { new MailAddress(mailto) },
					Subject = caption,
					Body = createMessage(name, email, message),
					ReplyToList = { new MailAddress(email) }
				};

				SmtpClient client = new SmtpClient() {
					Host = smtpServer,
					Port = port,
					EnableSsl = true,
					Credentials = new NetworkCredential(from.Split('@')[0], password),
					DeliveryMethod = SmtpDeliveryMethod.Network
				};
		
				client.Send(mail);
		
				mail.Dispose();
			}
			catch (Exception e) {
				throw new Exception("Mail.Send: " + e.Message);
			}
		}

		private string createMessage(string name, string email, string message) {
			string messageBody = "Имя пользователя: " + name + Environment.NewLine +
			                     "Адрес электронной почты: " + email + Environment.NewLine +
			                     "Сообщение: " + Environment.NewLine +
			                     message + Environment.NewLine;
			return messageBody;
		}
	}
}
