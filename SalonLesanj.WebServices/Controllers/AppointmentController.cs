using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;

namespace SalonLesanj.WebServices.Controllers {
	public class AppointmentController : BaseController<Appointment, AppointmentViewModel> {
		private IAppointmentManager appointmentManager;
		private static string imagesPath = "/Images/";
		//private static string imagesPath = "/Images/Dresses/";

		public AppointmentController(IAppointmentManager appointmentManager)
			: base(appointmentManager) {
			this.appointmentManager = appointmentManager;

		}

		[Authorize(Roles = "Admin")]
		public override IHttpActionResult Get(int id) {
			AppointmentViewModel vm = ToViewModel(appointmentManager.GetById(id));
			return Ok(vm);
		}

		[Authorize(Roles = "Admin")]
		public override IHttpActionResult Get() {
			IEnumerable<AppointmentViewModel> vm = appointmentManager
				.GetAll()
				//.OrderByDescending(i => i.Date)
				.ToList()
				.Select(ToViewModel);
			return Ok(vm);
		}

		[AllowAnonymous]
		public override IHttpActionResult Post(AppointmentViewModel viewModel) {

			var dresses = viewModel.Dresses.Select(i => i.Id);
			var item = new Appointment {
				Name = viewModel.Name,
				Phone = viewModel.Phone,
				Date = viewModel.Date,
				Details = viewModel.Details,
				IsApprove = viewModel.IsApprove,
				ApprovedDate = DateTime.Now
			};

			Appointment model = appointmentManager.Add(item, dresses);

			return Ok(model.Id);
		}

		protected override AppointmentViewModel ToViewModel(Appointment model) {
			AppointmentViewModel vm = new AppointmentViewModel(model);
			var dresses = model.Dresses.Select(ToViewModel);
			vm.Dresses = dresses;
			return vm;
		}

		protected override Appointment ToModel(AppointmentViewModel viewModel) {
			Appointment model = new Appointment() {
				Id = viewModel.Id,
				Name = viewModel.Name,
				Phone = viewModel.Phone,
				Date = viewModel.Date,
				Details = viewModel.Details,
				IsApprove = viewModel.IsApprove,
				ApprovedDate = viewModel.ApprovedDate
				//Dresses = viewModel.Dresses.Select(ToModel).ToList()
			};
			return model;
		}
		protected DressViewModel ToViewModel(Dress model) {
			DressViewModel vm = new DressViewModel(model);
			vm.ImageUrl1 = imagesPath + vm.ImageUrl1;
			vm.ImageUrl2 = imagesPath + vm.ImageUrl2;
			vm.ImageUrl3 = imagesPath + vm.ImageUrl3;
			return vm;
		}
		private Dress ToModel(DressViewModel viewModel) {
			Dress model = new Dress() {
				Id = viewModel.Id,
				Title = viewModel.Title,
				ImageUrl1 = viewModel.ImageUrl1.Replace(imagesPath, ""),
				ImageUrl2 = viewModel.ImageUrl2.Replace(imagesPath, ""),
				ImageUrl3 = viewModel.ImageUrl3.Replace(imagesPath, ""),
				Description = viewModel.Description,
				BrandId = viewModel.BrandId,
			};
			return model;
		}
	}
}
