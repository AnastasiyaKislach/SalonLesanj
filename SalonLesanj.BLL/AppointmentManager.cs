using System.Collections.Generic;
using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class AppointmentManager : DataManager<Appointment>, IAppointmentManager {

		private IUnitOfWork uow;
		public AppointmentManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}



		public Appointment Add(Appointment appointment, IEnumerable<int> dresses) {

			foreach (int dressId in dresses) {
				Dress dress = uow.Dresses.GetById(dressId);
				if (dress != null) {
					appointment.Dresses.Add(dress);
				}
			}

			return uow.Appointments.Create(appointment);
		}
	}
}
