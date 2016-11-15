using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class FileController : ApiController {

		//[Route("UploadImage")]
		//[AllowAnonymous]
		//[HttpPost]
		//public IHttpActionResult Post(HttpPostedFileWrapper upload) {
		//	if (upload != null) {
		//		string imageName = upload.FileName;
		//		string path = Path.Combine(HttpContext.Current.Server.MapPath("~/Images/uploads"), imageName);
		//		upload.SaveAs(path);
		//	}
		//	return Ok();
		//}

	//	[Authorize(Roles = "Admin")]
		public async Task<IHttpActionResult> Post() {

			if (!Request.Content.IsMimeMultipartContent()) {
				return BadRequest();
			}
			var provider = new MultipartMemoryStreamProvider();
			// путь к папке на сервере
			string root = HttpContext.Current.Server.MapPath("~/Images/");
			await Request.Content.ReadAsMultipartAsync(provider);

			string answer = "";

			foreach (var file in provider.Contents) {
				if (file.Headers.ContentDisposition.FileName == null) {
					answer += "Ошибка загрузки.";
					return Ok(answer);
				}
				var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
				byte[] fileArray = await file.ReadAsByteArrayAsync();

				using (FileStream fs = new FileStream(root + filename, FileMode.Create)) {
					await fs.WriteAsync(fileArray, 0, fileArray.Length);
				}
				answer += "Файл : " + filename + " загружен." + Environment.NewLine;
			}
			return Ok("файлы загружены");
		}

		public HttpResponseMessage Get() {
			var appData = HttpContext.Current.Server.MapPath("~/Images/");
			var images = Directory.GetFiles(appData).Select(x => new ImageViewModel {
				Url = Url.Content("/Images/" + Path.GetFileName(x))
			});

			string content = "  <script src='http://code.jquery.com/jquery-2.2.2.js'></script>";

			foreach (var image in images) {
				content += "<a href='#' class='returnImage' data-url='" + image.Url + "' click='chooseImg(" + image.Url + ")'>" +
					"<img src='" + image.Url + "' alt='Image' id='#image' data-source='" + image.Url + "' width='200'  height='200' /></a>";
			}
			
			//content += "<script type='text/javascript'> " +
			//		   "$(document).ready(function () { " +
			//		   "$('.returnImage').click('click', function (e) { " +
			//		   "var urlImage = $(this).attr('data-url'); " +
			//		   "var doc = window.opener.document; " +
			//		   "var id = doc.getElementsByTagName('label')[3].control.id; " +
			//		   "doc.getElementById(id).value = urlImage; " +
			//		   "window.close(); });  }); " +
			//		   "</script>";

			content += "<script src='http://localhost:1874/cke_getIdInputUrl.js' ></script>"; 
			
			return new HttpResponseMessage() {
				Content = new StringContent(
					content,
					Encoding.UTF8,
					"text/html"
				)
			};
		}
	}
}
