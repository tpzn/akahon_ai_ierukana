import { Amplify } from 'aws-amplify';  // 修正箇所
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import ChatUI from './components/ChatUI';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

function App() {
  return <ChatUI />;
}

export default withAuthenticator(App);
