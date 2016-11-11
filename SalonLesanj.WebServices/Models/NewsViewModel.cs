using System;
using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class NewsViewModel {
		public int Id { get; set; }

		public string Title { get; set; }

		public string ImageUrl { get; set; }

		public string Content { get; set; }

		public DateTime Date { get; set; }

		public NewsViewModel() {
		}
		public NewsViewModel(News news) {
			Id = news.Id;
			Title = news.Title;
			ImageUrl = news.ImageUrl;
			Content = news.Content;
			Date = news.Date;
		}
	}
}