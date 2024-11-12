// api.js
const API_ENDPOINT = "https://x7dhpmj3zc.execute-api.ap-northeast-1.amazonaws.com/lambda-ierukana/lambda-sample-resource";

export async function sendMessageToAPI(message, chatId) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message, chatId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in sendMessageToAPI:", error.message || error);
        throw error; // 呼び出し元でエラーハンドリングするため再スロー
    }
}
