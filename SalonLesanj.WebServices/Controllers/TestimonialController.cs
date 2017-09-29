using SalonLesanj.BusinessContracts;
using SalonLesanj.Entities;
using SalonLesanj.WebServices.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;
using System.Linq;
using System.Web;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace SalonLesanj.WebServices.Controllers {
	public class TestimonialController : BaseController<Testimonial, TestimonialViewModel> {
		private ITestimonialManager testimonialManager;
		private static string imagesPath = "/Images/";

		public TestimonialController(ITestimonialManager testimonialManager)
			: base(testimonialManager) {
			this.testimonialManager = testimonialManager;
		}

		[AllowAnonymous]
		public override IHttpActionResult Get() {
			
			if (User != null && User.Identity.IsAuthenticated) {
				string UserRoleName = "Admin";
				
				if (User.IsInRole(UserRoleName)) {
					return base.Get();
				}
			}

			IEnumerable<TestimonialViewModel> vmApproved = testimonialManager
																			.GetAllApproved()
																			.ToList()
																			.Select(ToViewModel);
			return Ok(vmApproved);


		}

		[AllowAnonymous]
		public override IHttpActionResult Post(TestimonialViewModel viewModel) {
			if (!ModelState.IsValid) {
				return BadRequest(ModelState);
			}
			viewModel.CreationTime = DateTime.Now;
			viewModel.IsApproved = false;
			Testimonial model = testimonialManager.Add(ToModel(viewModel));

			TestimonialViewModel createdViewModel = ToViewModel(model);

			return Ok(createdViewModel);
		}

		protected override TestimonialViewModel ToViewModel(Testimonial model) {
			TestimonialViewModel vm = new TestimonialViewModel(model);
			vm.ImageUrl = imagesPath + vm.ImageUrl;
			return vm;
		}

		protected override Testimonial ToModel(TestimonialViewModel viewModel) {
			Testimonial testimonial = new Testimonial() {
				Id = viewModel.Id,
				Author = viewModel.Author,
				Email = viewModel.Email,
				ImageUrl = viewModel.ImageUrl,
				Text = viewModel.Text,
				CreationTime = viewModel.CreationTime,
				IsApproved = viewModel.IsApproved
			};
			return testimonial;
		}
	}
}
