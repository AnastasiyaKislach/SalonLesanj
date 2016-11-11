using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class FileController : ApiController {

		[Authorize(Roles = "Admin")]
		public async Task<IHttpActionResult> Post() {
			if (!Request.Content.IsMimeMultipartContent()) {
				return BadRequest();
			}
			var provider = new MultipartMemoryStreamProvider();
			// путь к папке на сервере
			string root = System.Web.HttpContext.Current.Server.MapPath("~/Images/");
			await Request.Content.ReadAsMultipartAsync(provider);

			foreach (var file in provider.Contents) {
				var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
				byte[] fileArray = await file.ReadAsByteArrayAsync();

				using (System.IO.FileStream fs = new System.IO.FileStream(root + filename, System.IO.FileMode.Create)) {
					await fs.WriteAsync(fileArray, 0, fileArray.Length);
				}
			}
			return Ok("файлы загружены");
		}

		
		//[Authorize(Roles = "Admin")]
		public IHttpActionResult Get() {
			var appData = System.Web.HttpContext.Current.Server.MapPath("~/Images/uploads");
			var images = Directory.GetFiles(appData).Select(x => new ImageViewModel {
				Url = Url.Content("/Images/uploads/" + Path.GetFileName(x))
			});
			IEnumerable<ImageViewModel> vm = images;
			return Ok(vm);
		}
	}
}
