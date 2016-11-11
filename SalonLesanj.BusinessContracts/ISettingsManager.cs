using SalonLesanj.Entities;

namespace SalonLesanj.BusinessContracts {
	public interface ISettingsManager : IDataManager<Setting> {
		AppSettings GetAppSetting();
		void SetAppSetting(AppSettings settings);
	}
}
