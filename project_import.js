/**
 * インポートボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
$('#project_import #btn_project_import').on('click', function() {

	// 確認メッセージ表示
	ConfirmDialog.openDialog("選択したファイルのプロジェクト情報をインポートしますか？", function(){
		
		$("#main_content").LoadingOverlay("show");
		let fd = new FormData($('#fm_import_file').get(0));
		$.ajax({
			url: './admin_project_manage/project_import/import',
			type: 'post',
			data: fd,
			cache: false,
			processData: false,
			contentType: false,
		}).done(function(data){
			if(data.result == 'OK')
			{
				// 成功
				let msg = "インポートが完了しました。";
				// 完了メッセージ表示
				AlertDialog.openDialog(AlertDialog.DEF_ICON_INFO, msg, function(){
					// 完了メッセージ閉じたら画面リロード
					let url = './admin_project_manage/project_import';
					location.href = $('base').attr('href') +  url;
				});
			}
			else
			{
				// 失敗
				let msg = data.errors;
				// エラーメッセージを表示
				AlertDialog.openDialog(AlertDialog.DEF_ICON_ALERT, msg);
			}
		}).fail(function(){
			// Ajax通信エラー
			ajaxError();
		}).always(function(){
			// 常に実行する処理
			$("#main_content").LoadingOverlay("hide");
		})
	});
});