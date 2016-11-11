using System;
using System.Linq;
using SalonLesanj.BusinessContracts;
using SalonLesanj.DataContracts;
using SalonLesanj.Entities;

namespace SalonLesanj.BLL {
	public class SettingsManager : DataManager<Setting>, ISettingsManager {

		public SettingsManager(IUnitOfWork uoWork) : base(uoWork) { }


		public AppSettings GetAppSetting() {
			AppSettings settings = new AppSettings();
			var properties = typeof(AppSettings).GetProperties();
			var settingsDb = GetAll().ToList();

			foreach (var p in properties) {
				var p1 = p;
				var set = settingsDb.FirstOrDefault(i => i.Key == p1.Name);
				if (set != null) {
					p.SetValue(settings, set.Value);
				}
			}

			return settings;
		}

		public void SetAppSetting(AppSettings settings) {

			var properties = typeof(AppSettings).GetProperties();

			foreach (var p in properties) {

				var set = GetAll().FirstOrDefault(i => i.Key == p.Name);

				if (set == null) {
					Add(new Setting() {
						Key = p.Name,
						Value = (p.GetValue(settings) ?? String.Empty).ToString()
					});
				}
				else {
					set.Value = (p.GetValue(settings) ?? String.Empty).ToString();
					Edit(set);
				}
			}
		}
	}
}
