using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using SalonLesanj.WebServices.Providers;


namespace SalonLesanj.WebServices.Formatters {

	public class FileModelFormatter : MediaTypeFormatter {
		public FileModelFormatter() {
			SupportedMediaTypes.Add(new MediaTypeHeaderValue("multipart/form-data"));
		}

		public override bool CanReadType(Type type) {
			return true;
		}

		public override bool CanWriteType(Type type) {
			return false;
		}

		public override Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content,
			IFormatterLogger formatterLogger) {

			if (content.IsMimeMultipartContent()) {
				var provider = GetMultipartProvider();

				try {
					content.ReadAsMultipartAsync(provider);

					object uploadData = GetFormData(type, provider);

					return Task.FromResult(uploadData);
				}
				catch (Exception e) {
					formatterLogger.LogError(e.Message, e);
				}
			}

			return base.ReadFromStreamAsync(type, readStream, content, formatterLogger);
		}

		protected UploadMultipartFormDataStreamProvider GetMultipartProvider() {
			string root = HttpContext.Current.Server.MapPath("~/Images/");
			if (!Directory.Exists(root)) {
				Directory.CreateDirectory(root);
			}
			return new UploadMultipartFormDataStreamProvider(root);
		}

		protected object GetFormData(Type type, MultipartFormDataStreamProvider result) {
			if (result.FormData.HasKeys()) {
				var json = "{'" + result.FormData.ToString().Replace("=", "':'").Replace("&", "','") + "'}";

				if (!String.IsNullOrEmpty(json))
					return JsonConvert.DeserializeObject(json, type);
			}

			return null;
		}
	}
}