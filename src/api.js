export const sendMessageToAPI = async (message, chatId) => {
    try {
      const response = await fetch('https://ps1hyknny1.execute-api.ap-northeast-1.amazonaws.com/lambda-sample-stage/lambda-sample-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, chatId })
      });
  
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }
  
      const data = await response.json();
      return data.body || 'レスポンスがありません';
    } catch (error) {
      console.error('API呼び出しエラー:', error);
      return 'エラーが発生しました。';
    }
  };
  