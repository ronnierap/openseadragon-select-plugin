/* eslint-disable @typescript-eslint/no-var-requires */
(async function() {
	var osd = window.OpenSeadragon;
	var plugin = window.OsdSelectionPlugin;
	if (!osd) {
		osd = await import('openseadragon');
		if (!osd) {
			throw new Error('OpenSeadragon is missing.');
		}
	}
	if (!plugin) {
		plugin = await import('./selection');
		if (!plugin) {
			throw new Error(
				'OsdSelectionPlugin in missing',
			);
		}
	}
	osd.Viewer.prototype.selection = plugin.selection;
	osd.Viewer.prototype.initSelection =
		plugin.initSelection;
})();
