/**
 * 画面初期表示処理
 * @param なし
 * @return なし
 */
$(function(){
	// プロジェクト一覧表示時にウィンドウID未設定の場合は設定する。
	// (別タブでログインしたときにセッションタイムアウトとする為の対応。)
	let sessionWindowId = sessionStorage.getItem('window_id');
	if(null == sessionWindowId || "null" == sessionWindowId) {
		// 現在時刻をウィンドウIDとしてローカルストレージとセッションストレージに保持する。
		let id = new Date().getTime();
		localStorage.setItem('window_id', id);
		sessionStorage.setItem('window_id', id);
	}
});

/**
 * 追加ボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
function onClickProjectAdd() {
	ProjectConfigDialog.openDialog(ProjectConfigDialog.DIALOG_TYPE_ADD, null);
}

/**
 * コピー追加ボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
function onClickProjectCopyAdd() {
	let copy_project_id = $('#select_copy_project').val();
	ProjectConfigDialog.openDialog(ProjectConfigDialog.DIALOG_TYPE_COPYADD,copy_project_id);
}

/**
 * 変更ボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
function onClickProjectChange(project_id) {
	ProjectConfigDialog.openDialog(ProjectConfigDialog.DIALOG_TYPE_UPDATE, project_id);
}

const aaa = 1;
aaa = 2;


/**
 * 検索ボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
$('#project_search_cond #btn_serach').on('click', function() {
	$("#project_list_result").LoadingOverlay("show");
	// 送信
	$.ajax({
		url: './admin_project_manage/project_list/search',
		type: 'get',
		data: $('#project_search_cond form').serialize()
	}).done(function(data){
		if(data['result'] == 'OK')
		{
			// 成功
			$('#project_list_result').html(data['html']);
			project_list_init();
		}
		else
		{
			// エラーの場合は画面リロード(セッションタイムアウト時はタイムアウト画面に遷移する)
			reloadAll();
		}
	}).fail(function() {
		// Ajax通信エラー
		ajaxError();
	}).always(function() {
		// 常に実行する処理
		$("#project_list_result").LoadingOverlay("hide");
	});

});


/**
 * プロジェクト一覧表示時の初期処理
 * 
 * @param なし
 * @return なし
 */
function project_list_init() {

	// プロジェクトログイン用ボタン(管理／運用／閲覧)クリック時の処理を設定
	$('#project_list_content .btnProjectLogin').on('click', function() {
		// クリックされたボタンのプロジェクトIDを取得する。
		let project_id = $(this).data('project_id');
		let kengen_type = $(this).data('kengen_type');

		$("#project_manage_contents").LoadingOverlay("show");
		// 送信
		$.ajax({
			url: './admin_project_manage/project_list/login_project',
			type: 'post',
			data: {
				'project_id':project_id,
				'kengen_type':kengen_type,
			}
		}).done(function(data){
			if(data['result'] == 'OK')
			{
				// 成功
				// 所要時間モードor所要時間＋様式出力モードの場合
				if (data['mode'] == 'rtps') {
					// LED閲覧画面に遷移
					location.href= $('base').attr('href') + "./led_disp";
				}
				// 様式出力モードの場合
				else {
					// 報告様式データ出力画面に遷移
					location.href= $('base').attr('href') + "./report";
				}
			}
			else if(data['result'] == 'NG')
			{
				// ログインエラー
				let msg = "ユーザID、またはパスワードが不正です。<br>再度ご確認の上、ログインし直してください。";
				AlertDialog.openDialog(AlertDialog.DEF_ICON_ALERT, msg);
			}
			else
			{
				location.href = $('base').attr('href') + "./timeout";
			}
		}).fail(function() {
			// Ajax通信エラー
			ajaxError();
		}).always(function() {
			// 常に実行する処理
			$("#project_manage_contents").LoadingOverlay("hide");
		});

	});

	// テーブルのヘッダ固定
	$('#project_list_content #project_table').floatThead({zIndex: 1, scrollContainer:true});

	// ToolTip設定(プロジェクト名最大文字入力対応)
	setTooltip();
}


/**
 * 表示条件クリアボタンクリック時の処理
 * 
 * @param なし
 * @return なし
 */
$('#project_list_search_clear #btn_clear').on('click', function() {
	$('#project_search_cond #search_project_name').val("");
	$('#project_search_cond #search_road_id').prop('selectedIndex', 0);
});

/**
 * 初期表示時の処理
 * 
 * @param なし
 * @return なし
 */
$('#project_search_cond #btn_serach').trigger('click');

