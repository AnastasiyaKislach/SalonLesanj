using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class NewsController : BaseController<News, NewsViewModel> {

		private INewsManager newsManager;
		private static string imagesPath = "/Images/";
		//private static string imagesPath = "/Images/News/";

		public NewsController(INewsManager newsManager)
			: base(newsManager) {
			this.newsManager = newsManager;
		}

		
		[AllowAnonymous]
		public override IHttpActionResult Get() {
			IEnumerable<NewsViewModel> vm = newsManager
				.GetAll()
				.OrderByDescending(i => i.Date)
				.ToList()
				.Select(ToViewModel);
			return Ok(vm);
		}

		[Authorize(Roles = "Admin")]
		public override IHttpActionResult Post(NewsViewModel viewModel) {
			if (!ModelState.IsValid) {
				return BadRequest(ModelState);
			}
			viewModel.Date = DateTime.Now;
			News model = newsManager.Add(ToModel(viewModel));

			NewsViewModel createViewModel = ToViewModel(model);

			return Ok(createViewModel);
		}

		protected override NewsViewModel ToViewModel(News model) {
			NewsViewModel vm = new NewsViewModel(model);
			vm.ImageUrl = imagesPath + vm.ImageUrl;
			return vm;
		}

		protected override News ToModel(NewsViewModel viewModel) {
			News model = new News() {
				Id = viewModel.Id,
				Title = viewModel.Title,
				ImageUrl = viewModel.ImageUrl,
				Content = viewModel.Content,
				Date = viewModel.Date
			};
			return model;
		}
	}
}
