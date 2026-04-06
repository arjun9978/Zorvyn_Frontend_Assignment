import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, ThumbsUp, ThumbsDown, Clock, Eye, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  replies: number;
  views: number;
  likes: number;
  dislikes: number;
  userLiked: boolean;
  userDisliked: boolean;
  lastActivity: string;
  timestamp: Date;
  userReplies?: Reply[];
}

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
  userLiked: boolean;
  userDisliked: boolean;
}

const Forums = () => {
  const [topics, setTopics] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Tips & Tricks for Maximizing FinEnsure",
      content: "Share your best practices and workflows for using FinEnsure efficiently. What features do you use the most?",
      author: "Sarah Chen",
      replies: 2,
      views: 156,
      likes: 45,
      dislikes: 3,
      userLiked: false,
      userDisliked: false,
      lastActivity: "2 hours ago",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userReplies: [
        {
          id: 1,
          author: "Arjun",
          content: "I love using the recurring transactions feature for my subscriptions. It saves so much time!",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 12,
          dislikes: 1,
          userLiked: false,
          userDisliked: false
        },
        {
          id: 2,
          author: "Alice Smith",
          content: "The AI receipt scanning is a game changer. I just snap photos and it does all the work.",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          likes: 18,
          dislikes: 0,
          userLiked: false,
          userDisliked: false
        }
      ]
    },
    {
      id: 2,
      title: "How do you categorize subscription services?",
      content: "I'm struggling to decide if Netflix should be Entertainment or Utilities. What's your approach?",
      author: "Mike Johnson",
      replies: 0,
      views: 89,
      likes: 23,
      dislikes: 2,
      userLiked: false,
      userDisliked: false,
      lastActivity: "5 hours ago",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      userReplies: []
    },
    {
      id: 3,
      title: "AI Receipt Scanning Feedback",
      content: "Let's discuss the AI receipt scanning feature. Share your experiences and suggestions for improvement.",
      author: "Admin",
      replies: 0,
      views: 234,
      likes: 67,
      dislikes: 5,
      userLiked: false,
      userDisliked: false,
      lastActivity: "1 day ago",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      userReplies: []
    },
    {
      id: 4,
      title: "Best practices for tracking business expenses",
      content: "For small business owners using FinEnsure, what's your strategy for separating personal and business expenses?",
      author: "Emma Williams",
      replies: 0,
      views: 178,
      likes: 54,
      dislikes: 1,
      userLiked: false,
      userDisliked: false,
      lastActivity: "2 days ago",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      userReplies: []
    }
  ]);

  const [selectedTopic, setSelectedTopic] = useState<ForumPost | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newReplyContent, setNewReplyContent] = useState("");
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;

    const newTopic: ForumPost = {
      id: topics.length + 1,
      title: newTopicTitle,
      content: newTopicContent,
      author: "You",
      replies: 0,
      views: 0,
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      lastActivity: "Just now",
      timestamp: new Date(),
      userReplies: []
    };

    setTopics([newTopic, ...topics]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setShowNewTopicForm(false);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !newReplyContent.trim()) return;

    const newReply: Reply = {
      id: (selectedTopic.userReplies?.length || 0) + 1,
      author: "You",
      content: newReplyContent,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false
    };

    const updatedTopics = topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return {
          ...topic,
          replies: topic.replies + 1,
          lastActivity: "Just now",
          userReplies: [...(topic.userReplies || []), newReply]
        };
      }
      return topic;
    });

    setTopics(updatedTopics);
    setSelectedTopic({
      ...selectedTopic,
      replies: selectedTopic.replies + 1,
      userReplies: [...(selectedTopic.userReplies || []), newReply]
    });
    setNewReplyContent("");
  };

  const handleLikeTopic = (topicId: number) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        if (topic.userLiked) {
          // Remove like
          return { ...topic, likes: topic.likes - 1, userLiked: false };
        } else if (topic.userDisliked) {
          // Switch from dislike to like
          return { ...topic, likes: topic.likes + 1, dislikes: topic.dislikes - 1, userLiked: true, userDisliked: false };
        } else {
          // Add like
          return { ...topic, likes: topic.likes + 1, userLiked: true };
        }
      }
      return topic;
    }));
    
    if (selectedTopic?.id === topicId) {
      if (selectedTopic.userLiked) {
        setSelectedTopic({ ...selectedTopic, likes: selectedTopic.likes - 1, userLiked: false });
      } else if (selectedTopic.userDisliked) {
        setSelectedTopic({ ...selectedTopic, likes: selectedTopic.likes + 1, dislikes: selectedTopic.dislikes - 1, userLiked: true, userDisliked: false });
      } else {
        setSelectedTopic({ ...selectedTopic, likes: selectedTopic.likes + 1, userLiked: true });
      }
    }
  };

  const handleDislikeTopic = (topicId: number) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        if (topic.userDisliked) {
          // Remove dislike
          return { ...topic, dislikes: topic.dislikes - 1, userDisliked: false };
        } else if (topic.userLiked) {
          // Switch from like to dislike
          return { ...topic, dislikes: topic.dislikes + 1, likes: topic.likes - 1, userDisliked: true, userLiked: false };
        } else {
          // Add dislike
          return { ...topic, dislikes: topic.dislikes + 1, userDisliked: true };
        }
      }
      return topic;
    }));
    
    if (selectedTopic?.id === topicId) {
      if (selectedTopic.userDisliked) {
        setSelectedTopic({ ...selectedTopic, dislikes: selectedTopic.dislikes - 1, userDisliked: false });
      } else if (selectedTopic.userLiked) {
        setSelectedTopic({ ...selectedTopic, dislikes: selectedTopic.dislikes + 1, likes: selectedTopic.likes - 1, userDisliked: true, userLiked: false });
      } else {
        setSelectedTopic({ ...selectedTopic, dislikes: selectedTopic.dislikes + 1, userDisliked: true });
      }
    }
  };

  const handleLikeReply = (replyId: number) => {
    if (!selectedTopic) return;

    const updatedReplies = selectedTopic.userReplies?.map(reply => {
      if (reply.id === replyId) {
        if (reply.userLiked) {
          // Remove like
          return { ...reply, likes: reply.likes - 1, userLiked: false };
        } else if (reply.userDisliked) {
          // Switch from dislike to like
          return { ...reply, likes: reply.likes + 1, dislikes: reply.dislikes - 1, userLiked: true, userDisliked: false };
        } else {
          // Add like
          return { ...reply, likes: reply.likes + 1, userLiked: true };
        }
      }
      return reply;
    });

    const updatedTopic = { ...selectedTopic, userReplies: updatedReplies };
    setSelectedTopic(updatedTopic);

    setTopics(topics.map(topic =>
      topic.id === selectedTopic.id ? updatedTopic : topic
    ));
  };

  const handleDislikeReply = (replyId: number) => {
    if (!selectedTopic) return;

    const updatedReplies = selectedTopic.userReplies?.map(reply => {
      if (reply.id === replyId) {
        if (reply.userDisliked) {
          // Remove dislike
          return { ...reply, dislikes: reply.dislikes - 1, userDisliked: false };
        } else if (reply.userLiked) {
          // Switch from like to dislike
          return { ...reply, dislikes: reply.dislikes + 1, likes: reply.likes - 1, userDisliked: true, userLiked: false };
        } else {
          // Add dislike
          return { ...reply, dislikes: reply.dislikes + 1, userDisliked: true };
        }
      }
      return reply;
    });

    const updatedTopic = { ...selectedTopic, userReplies: updatedReplies };
    setSelectedTopic(updatedTopic);

    setTopics(topics.map(topic =>
      topic.id === selectedTopic.id ? updatedTopic : topic
    ));
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        {selectedTopic ? (
          /* Topic Detail View */
          <div>
            <button
              onClick={() => setSelectedTopic(null)}
              className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-6"
            >
              <ArrowLeft className="size-5" />
              Back to Forums
            </button>

            <div className="bg-[#0f1419] p-6 rounded-lg border border-gray-800 mb-6">
              <h1 className="text-3xl font-bold mb-4">{selectedTopic.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span className="text-cyan-500">{selectedTopic.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {selectedTopic.timestamp.toLocaleString()}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="size-4" />
                  {selectedTopic.views} views
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-4" />
                  {selectedTopic.replies} replies
                </span>
              </div>
              <p className="text-gray-300 mb-4">{selectedTopic.content}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikeTopic(selectedTopic.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    selectedTopic.userLiked 
                      ? 'text-cyan-400' 
                      : 'text-cyan-500 hover:text-cyan-400'
                  }`}
                >
                  <ThumbsUp className={`size-5 ${selectedTopic.userLiked ? 'fill-current' : ''}`} />
                  <span>{selectedTopic.likes}</span>
                </button>
                <button
                  onClick={() => handleDislikeTopic(selectedTopic.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    selectedTopic.userDisliked 
                      ? 'text-red-400' 
                      : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  <ThumbsDown className={`size-5 ${selectedTopic.userDisliked ? 'fill-current' : ''}`} />
                  <span>{selectedTopic.dislikes}</span>
                </button>
              </div>
            </div>

            {/* Replies */}
            <div className="space-y-4 mb-6">
              <h2 className="text-2xl font-semibold">{selectedTopic.replies} Replies</h2>
              {selectedTopic.userReplies?.map((reply) => (
                <div key={reply.id} className="bg-[#0f1419] p-5 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-cyan-500 font-semibold">{reply.author}</span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock className="size-3" />
                      {reply.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{reply.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikeReply(reply.id)}
                      className={`flex items-center gap-2 transition-colors text-sm ${
                        reply.userLiked 
                          ? 'text-cyan-400' 
                          : 'text-cyan-500 hover:text-cyan-400'
                      }`}
                    >
                      <ThumbsUp className={`size-4 ${reply.userLiked ? 'fill-current' : ''}`} />
                      <span>{reply.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislikeReply(reply.id)}
                      className={`flex items-center gap-2 transition-colors text-sm ${
                        reply.userDisliked 
                          ? 'text-red-400' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <ThumbsDown className={`size-4 ${reply.userDisliked ? 'fill-current' : ''}`} />
                      <span>{reply.dislikes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="bg-[#0f1419] p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-4">Add Your Reply</h3>
              <form onSubmit={handleAddReply}>
                <textarea
                  value={newReplyContent}
                  onChange={(e) => setNewReplyContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 min-h-[120px] mb-4"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500 text-gray-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Send className="size-5" />
                  Post Reply
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Forum List View */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="size-10 text-cyan-500" />
              <h1 className="text-4xl font-bold">Community Forums</h1>
            </div>

            <p className="text-gray-300 mb-8">
              Connect with other FinEnsure users, share tips, ask questions, and learn from the community.
            </p>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* New Topic Button */}
            {!showNewTopicForm && (
              <button
                onClick={() => setShowNewTopicForm(true)}
                className="mb-6 px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Start a New Discussion
              </button>
            )}

            {/* New Topic Form */}
            {showNewTopicForm && (
              <div className="bg-[#0f1419] p-6 rounded-lg border border-gray-800 mb-8">
                <h3 className="text-xl font-semibold mb-4">Create New Discussion</h3>
                <form onSubmit={handleCreateTopic}>
                  <input
                    type="text"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    placeholder="Discussion title..."
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 mb-4"
                    required
                  />
                  <textarea
                    value={newTopicContent}
                    onChange={(e) => setNewTopicContent(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 min-h-[150px] mb-4"
                    required
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-cyan-500 text-gray-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      Create Discussion
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewTopicForm(false)}
                      className="px-6 py-2 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Topics List */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">
                {searchQuery ? `Search Results (${filteredTopics.length})` : 'Recent Discussions'}
              </h2>
              {filteredTopics.length === 0 ? (
                <div className="bg-[#0f1419] p-8 rounded-lg border border-gray-800 text-center">
                  <p className="text-gray-400">No discussions found. Try a different search term.</p>
                </div>
              ) : (
                filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="bg-[#0f1419] p-5 rounded-lg border border-gray-800 hover:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 hover:text-cyan-500 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{topic.content}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span>
                        by <span className="text-cyan-500">{topic.author}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="size-4" />
                        {topic.replies} replies
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="size-4" />
                        {topic.views} views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="size-4" />
                        {topic.likes}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ThumbsDown className="size-4" />
                        {topic.dislikes}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {topic.lastActivity}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forums;
