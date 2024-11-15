import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator, translations } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';  // `@aws-amplify/core`からI18nをインポート
import ChatUI from './components/ChatUI';
import '@aws-amplify/ui-react/styles.css';
import logo from './birdee_logo_tate.png';

Amplify.configure(awsExports);

// 日本語の翻訳を設定
I18n.putVocabulariesForLanguage('ja', {
  'Sign In': 'ログイン',
  'Sign in': 'ログイン',
  'Signing in': 'ログインしています',
  'Sign In with Google': 'Googleでログイン',
  'Email':'メールアドレス',
  'Enter your Email': 'メールアドレスを入力してください',
  'Password':'パスワード',
  'Enter your Password':'パスワードを入力してください',
  'Create Account': 'アカウント新規作成',
  'Sign Up with Google': 'Googleでサインアップ',
  'Confirm Password': 'パスワード確認',
  'Please confirm your Password':'もう一度パスワードを入力',
  'Sign Up': '新規登録',
  'Password must have at least 8 characters': 'パスワードは8文字以上で設定してください',
  'We Emailed You': 'メールを送信しました',
  'Your code is on the way. To log in, enter the code we emailed to {email}. It may take a minute to arrive.': 
    'コードを送信しました。ログインするには {email} に送信されたコードを入力してください。届くまで少し時間がかかることがあります。',
  'Confirmation Code': '確認コード',
  'Enter your code': 'コードを入力',
  'Confirm': '確認',
  'Confirming':'確認中',
  'Resend Code': 'コード再送信',
  'Forgot your password?': 'パスワードをお忘れですか？',
  'Reset your password': 'パスワードをリセット',
  'Enter your username': 'ユーザー名を入力してください',
  'Enter your password': 'パスワードを入力してください',
  'Sign in to your account': 'アカウントにログイン',
  'Submit': '送信',
  'Back to Sign In': 'ログインに戻る',
  'Your passwords must match': 'パスワードが一致していません',
  'User does not exist.': 'ユーザーが存在しません',
  'Incorrect username or password.': 'ユーザー名またはパスワードが違います',
  'User is not confirmed.': 'ユーザーは検証されていません',
  'User already exists': 'ユーザーは既に存在します',
  'Invalid verification code provided, please try again.': '指定された確認コードが無効です。もう一度お試しください',
  'Invalid password format': 'パスワードのフォーマットが不正です',
  'Account recovery requires verified contact information': 'アカウントの復元には確認済みの連絡先情報が必要です',
  'Invalid phone number format': '不正な電話番号フォーマットです。 電話番号は次のフォーマットで入力してください: +12345678900',
  'An account with the given email already exists.': 'そのメールアドレスは既に存在します',
  'Username cannot be empty': 'ユーザー名は必須です',
  'Password attempts exceeded': 'パスワード試行回数が超過しました',
  'Attempt limit exceeded, please try after some time.': '試行制限を超過しました。しばらくしてからもう一度お試しください',
  'Username/client id combination not found.': 'ユーザーが存在しません',
  'CUSTOM_AUTH is not enabled for the client.': 'パスワードは必須です',
  'Password did not conform with policy: Password not long enough': 'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)',
  'Password did not conform with policy: Password must have uppercase characters': 'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)',
  'Password did not conform with policy: Password must have lowercase characters': 'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)',
  'Password did not conform with policy: Password must have numeric characters': 'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)',
  "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
  "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
  'Email cannot be empty': 'メールアドレスが入力されていません',
  'Phone number cannot be empty': '電話番号が入力されていません',
  'Password cannot be empty': 'パスワードが入力されていません',
  'Confirmation code cannot be empty': '認証コードが入力されていません',
  'Error creating account': 'アカウント作成時のエラーが発生しました',
  'Network Error': 'ネットワークエラーが発生しました',
  'Please use your credentials to sign in': '認証情報を使ってログインしてください',
  'Custom auth lambda trigger is not configured for the user pool.': 'パスワードが入力されていません',
  'Send code': 'コードを送信する'
  // 必要に応じて追加
});

// 日本語に設定
I18n.setLanguage('ja');

function App() {
  return <ChatUI />;
}

export default withAuthenticator(App, {
  hideSignUp: false,
  components: {
    Header() {
      return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',  // 白背景
          width: '100%',  // 幅全体
          padding: '1rem',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textAlign: 'center',
          boxSizing: 'border-box',  // パディングも含める
          borderBottom: '1px solid #ccc',  // 下に境界線を追加
        }}
      >
        <img src={logo} alt="Birdee Logo" 
          style={{ width: '50px', height: '50px', marginRight: '10px' }} 
        />
        学習ツール
      </div>

      );
    },
  },
});