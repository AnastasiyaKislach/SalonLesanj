using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SalonLesanj.BusinessContracts;

namespace SalonLesanj.WebServices.Controllers {
	public abstract class BaseController<TModel, TViewModel> : ApiController {
		protected IDataManager<TModel> dataManager;

		public BaseController(IDataManager<TModel> dataManager) {
			this.dataManager = dataManager;
		}

		[AllowAnonymous]
		public virtual IHttpActionResult Get(int id) {
			TViewModel vm = ToViewModel(dataManager.GetById(id));
			return Ok(vm);
		}

		[AllowAnonymous]
		public virtual IHttpActionResult Get() {
			
				IEnumerable<TViewModel> vm = dataManager
								.GetAll()
								.ToList()
								.Select(ToViewModel);
				return Ok(vm);
		}

		[Authorize(Roles = "Admin")]
		public virtual IHttpActionResult Post(TViewModel viewModel) {
			if (!ModelState.IsValid) {
				return BadRequest(ModelState);
			}
			TModel model = dataManager.Add(ToModel(viewModel));
			TViewModel createViewModel = ToViewModel(model);

			return Ok(createViewModel);
		}

		[Authorize(Roles = "Admin")]
		[HttpPut]
		public virtual IHttpActionResult Put(TViewModel viewModel) {
			if (!ModelState.IsValid) {
				return BadRequest(ModelState);
			}
			TModel model = dataManager.Edit(ToModel(viewModel));
			TViewModel updateViewModel = ToViewModel(model);

			return Ok(updateViewModel);
		}

		[Authorize(Roles = "Admin")]
		[HttpDelete]
		public virtual IHttpActionResult Delete(int id) {
			TModel model = dataManager.GetById(id);
			if (model == null) {
				return NotFound();
			}

			TModel deleted = dataManager.Delete(id);

			return Ok(deleted);
		}

		protected override void Dispose(bool disposing) {
			if (disposing) {
				dataManager.Dispose();
			}
		}

		protected abstract TViewModel ToViewModel(TModel model);
		protected abstract TModel ToModel(TViewModel viewModel);

	}
}
