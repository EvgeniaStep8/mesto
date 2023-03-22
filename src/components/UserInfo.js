export default class UserInfo {
	constructor(userNameSelector, userJobSelector, userAvatarSelector) {
		this._userName = document.querySelector(userNameSelector);
		this._userAbout = document.querySelector(userJobSelector);
		this._userAvatar = document.querySelector(userAvatarSelector);
	}

	getUserInfo() {
    const info = {
			name: this._userName.textContent,
			job: this._userAbout.textContent,
		}
		return info;
	}
	setUserInfo({name, about, link}) {
		this._userName.textContent = name;
		this._userAbout.textContent = about;
		this._userAvatar.src = link;
	}
}