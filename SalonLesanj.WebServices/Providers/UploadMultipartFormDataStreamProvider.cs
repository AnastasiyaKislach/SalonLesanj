using System;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;

namespace SalonLesanj.WebServices.Providers {
	public class UploadMultipartFormDataStreamProvider : MultipartFormDataStreamProvider {
		public string OldName { get; set; }
		public string NewName { get; set; }

		public UploadMultipartFormDataStreamProvider(string rootPath)
			: base(rootPath) {
		}

		public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers) {
			OldName = JsonConvert.DeserializeObject(headers.ContentDisposition.FileName).ToString();
			NewName = String.Format("{0}{1}", base.GetLocalFileName(headers), Path.GetExtension(OldName));

			return String.Format("{0}{1}", base.RootPath, OldName);
		}
	}
}