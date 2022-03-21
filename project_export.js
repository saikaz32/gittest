

/**
 * エクスポートボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
$('#project_export #btn_project_export').on('click', function() {

	// エクスポート確認ダイアログ表示
	let arrayExportInfo = {
		'funcExport'			:funcExport,
	}
	ExportDialog.openDialog(arrayExportInfo);
});

/**
 * エクスポート実行時の処理
 * 
 * @param なし
 * @return なし
 */
function funcExport()
{
	let project_id = $('#project_export #select_project').val();
	location.href = $('base').attr('href') + "./admin_project_manage/project_export/export?project_id=" + project_id;
}
