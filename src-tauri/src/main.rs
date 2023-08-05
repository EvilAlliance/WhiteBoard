#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .setup(|app| {
        {
        let window = app.get_window("main").unwrap();
        window.open_devtools();
        window.close_devtools();
        }
        Ok(())
        }).plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
