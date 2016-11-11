using System;
using System.Collections.Generic;
using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class AppointmentViewModel {
		public int Id { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		public DateTime Date { get; set; }
		public string Details { get; set; }
		public bool IsApprove { get; set; }

		public IEnumerable<DressViewModel> Dresses { get; set; }

		public AppointmentViewModel() {
			Dresses = new List<DressViewModel>();
		}

		public AppointmentViewModel(Appointment appointment)
			: this() {
			Id = appointment.Id;
			Name = appointment.Name;
			Phone = appointment.Phone;
			Date = appointment.Date;
			Details = appointment.Details;
			IsApprove = appointment.IsApprove;
		}
	}
}