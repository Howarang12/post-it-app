import React from 'react'

const About = () => {
	return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Post-it App FAQ</h2>
      <ul>
        <li className="mb-6">
          <strong className="block text-lg mb-2">What is the Post-it app?</strong>
          <p>The Post-it app is a platform where users can create posts, similar to digital sticky notes, to share their thoughts, ideas, or announcements with others.</p>
        </li>
        <li className="mb-6">
          <strong className="block text-lg mb-2">How do I create a post?</strong>
          <p>To create a post, simply log in to your account (or sign up if you're new), navigate to the "Create Post" button on the home feed or on your profile, and start writing your content.</p>
        </li>
        <li className="mb-6">
          <strong className="block text-lg mb-2">Can I comment on posts?</strong>
          <p>Yes, you can comment on posts to engage in discussions or provide feedback. Simply click on the post you want to comment on, scroll down to the comments section, and type your comment in the input box.</p>
        </li>
        <li className="mb-6">
          <strong className="block text-lg mb-2">Are there any limitations on post content?</strong>
          <p>While we encourage users to express themselves freely, we have community guidelines in place to ensure that all content is respectful and appropriate. Posts containing offensive language, hate speech, or inappropriate content will be removed.</p>
        </li>
        <li className="mb-6">
          <strong className="block text-lg mb-2">Can I edit or delete my posts?</strong>
          <p>Yes, you can edit or delete your posts at any time. Simply navigate to the post you want to modify, click on the edit or delete option, and follow the prompts to make changes or remove the post entirely.</p>
        </li>
        <li className="mb-6">
          <strong className="block text-lg mb-2">How can I discover new posts?</strong>
          <p>You can discover new posts by browsing through the app's main feed, where the latest posts from users are displayed. You can also use the search filter to find posts that interest you.</p>
        </li>
        <li>
          <strong className="block text-lg mb-2">How can I provide feedback or suggest new features?</strong>
          <p>We value your feedback and are always looking for ways to improve the app. You can send us your suggestions, feedback, or feature requests by contacting our support team at postit@email.com. We appreciate your input!</p>
        </li>
      </ul>
    </div>
	)
}

export default About