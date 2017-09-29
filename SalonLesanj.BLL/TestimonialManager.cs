using System.Linq;
using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class TestimonialManager : DataManager<Testimonial>, ITestimonialManager {

		private IUnitOfWork uow;
		public TestimonialManager(IUnitOfWork uoWork)
			: base(uoWork) {
			uow = uoWork;
		}

		public IQueryable<Testimonial> GetAllApproved() {
			return GetAll().Where(i => i.IsApproved);
		}
	}
}
