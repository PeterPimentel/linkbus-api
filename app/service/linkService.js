const LinkRepository = require("../repositories/linkRepository");
const ErrorHandler = require("../utils/ErrorHandler");
const { getMessage } = require("../utils/messages");

const Log = require("../utils/Log");

const _validateLink = (link) => {
	Log.trace("_validateLink", "LinkService");
	if (!link.position) {
		throw ErrorHandler.log({ message: getMessage("invalidValue", "position") });
	}
	if (!link.name) {
		throw ErrorHandler.log({ message: getMessage("invalidValue", "name") });
	}
	if (!link.url) {
		throw ErrorHandler.log({ message: getMessage("invalidValue", "url") });
	}
};

const _reOrderLinks = async (user) => {
	Log.trace("Re-Order", "LinkService");
	const links = await LinkRepository.index(user.id, {});

	return links.map((link) => ({
		...link,
		position: link.position + 1,
	}));
};

const index = async (query, user) => {
	try {
		Log.trace("Index", "LinkService");
		if (user.id) {
			const links = await LinkRepository.index(user.id, query);
			return links;
		} else {
			throw ErrorHandler.log({ message: getMessage("listError", "link") });
		}
	} catch (error) {
		throw ErrorHandler.log({ message: getMessage("listError", "link") }, error);
	}
};

const show = async (params, user) => {
	try {
		Log.trace("Show", "LinkService");
		const links = await LinkRepository.show(user, params.id);
		if (Array.isArray(links) && links.length > 0) {
			return links[0];
		} else {
			throw ErrorHandler.log({ message: getMessage("showError", "link") });
		}
	} catch (error) {
		throw ErrorHandler.log({ message: getMessage("notAuthorized") }, error);
	}
};

const store = async (data, user) => {
	try {
		Log.trace("Store", "LinkService");

		const link = {
			...data,
			user_id: user.id,
			position: 1,
			active: 0,
		};
		const links = await _reOrderLinks(user);
		const response = await LinkRepository.store(link, links);

		return {
			...data,
			id: response[0].insertId,
			user_id: user.id,
			position: 1,
		};
	} catch (error) {
		throw ErrorHandler.log(
			{ message: getMessage("createError", "link") },
			error
		);
	}
};

const update = async (params, data, user) => {
	try {
		Log.trace("Update", "LinkService");

		_validateLink(data);
		const result = await LinkRepository.update(user, params.id, data);
		if (result.affectedRows === 0) {
			throw ErrorHandler.log({ message: getMessage("notAuthorized") });
		} else {
			return { ...data };
		}
	} catch (error) {
		throw ErrorHandler.log(
			{
				message: getMessage("unexpectedError"),
				status: 500,
			},
			error
		);
	}
};

const remove = async (params, user) => {
	try {
		//TODO reorder link positions
		//Ao remover um link, o position dos links posteiores a ele deve ser reduzido em 1
		//EX: remover o link de poition 3 os links de position 4, 5, 6 devem ficar  3,4,5
		Log.trace("Remove", "LinkService");
		const result = await LinkRepository.remove(user, params.id);
		if (result.affectedRows === 0) {
			throw ErrorHandler.log({ message: getMessage("notAuthorized") });
		} else {
			return { response: true };
		}
	} catch (error) {
		throw ErrorHandler.log(
			{
				message: getMessage("unexpectedError"),
				status: 500,
			},
			error
		);
	}
};

module.exports = { index, show, store, update, remove };
