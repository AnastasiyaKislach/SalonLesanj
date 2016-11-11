using System.Collections.Generic;
using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class KindViewModel {
		public int Id { get; set; }
		public string Title { get; set; }
		public string TitleRus { get; set; }

		public virtual IEnumerable<AccessoryViewModel> Accessories { get; set; }

		public KindViewModel() {
			Accessories = new List<AccessoryViewModel>();
		}

		public KindViewModel(Kind kind): this()  {
			Id = kind.Id;
			Title = kind.Title;
			TitleRus = kind.TitleRus;
		}
	}
}