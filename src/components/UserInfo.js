export default class UserInfo {
	constructor(userNameSelector, userJobSelector, userAvatarSelector) {
		this._userName = document.querySelector(userNameSelector);
		this._userAbout = document.querySelector(userJobSelector);
		this._userAvatar = document.querySelector(userAvatarSelector);
	}

	getUserInfo() {
    const info = {
			name: this._name,
			about: this._about,
		}
		return info;
	}

	getUserId(_id) {
		return this._id;
	}

	setUserInfo({name, about, _id}) {
		this._name = name;
		this._about = about;
		this._id = _id;
    this._userName.textContent = this._name;
		this._userAbout.textContent = this._about;
		
	}

	setUserAvatar({avatar}) {
		this._avatar = avatar;
    this._userAvatar.src = this._avatar;
	}
}