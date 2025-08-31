import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  MessageCircle,
  Plus,
  Search,
  Globe,
  Send,
  Phone,
  Video,
  UserPlus,
  UserMinus,
} from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAppContext } from "./AppContext";
import { toast } from "sonner";

export function StudyGroups() {
  const { state, dispatch } = useAppContext();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newGroupDialog, setNewGroupDialog] = useState(false);
  const [newGroupForm, setNewGroupForm] = useState({
    name: "",
    language: "",
    level: "Beginner",
    description: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredGroups = state.studyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedGroupData = state.studyGroups.find(
    (g) => g.id === selectedGroup
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(scrollToBottom, [selectedGroupData?.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const message = {
        groupId: selectedGroup,
        userId: state.user.id,
        userName: state.user.name,
        userCountry: "🇺🇸", // Would come from user profile
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        avatar: state.user.avatar,
        isMe: true,
      };

      dispatch({
        type: "ADD_MESSAGE",
        groupId: selectedGroup,
        message,
      });
      setNewMessage("");
      toast.success("Message sent!");
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupForm.name.trim() || !newGroupForm.language.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupForm.name,
      language: newGroupForm.language,
      level: newGroupForm.level,
      members: 1,
      online: 1,
      description: newGroupForm.description,
      country: "International",
      lastActive: "now",
      isJoined: true,
      messages: [],
    };

    // Add to state (you would typically send this to your backend)
    dispatch({ type: "CREATE_GROUP", group: newGroup });
    setSelectedGroup(newGroup.id);
    toast.success("Study group created successfully!");

    // Reset form
    setNewGroupForm({
      name: "",
      language: "",
      level: "Beginner",
      description: "",
    });
    setNewGroupDialog(false);
  };
const handleDeleteGroup = (id: string) => {
  if (window.confirm("Are you sure you want to delete this group?")) {
    dispatch({ type: "DELETE_GROUP", groupId: id });
    console.log("Deleted group:", id); // 👀 Debug check
    toast.success("Group deleted successfully!");
  }
};

  const handleJoinGroup = (groupId: string) => {
    dispatch({ type: "JOIN_GROUP", groupId });
    toast.success("Joined group successfully!");
  };

  const handleLeaveGroup = (groupId: string) => {
    dispatch({ type: "LEAVE_GROUP", groupId });
    if (selectedGroup === groupId) {
      setSelectedGroup(null);
    }
    toast.success("Left group successfully!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const onlineMembers = [
    {
      name: "Maria Rodriguez",
      country: "🇲🇽",
      avatar: "MR",
      status: "online",
    },
    {
      name: "Carlos Silva",
      country: "🇪🇸",
      avatar: "CS",
      status: "online",
    },
    {
      name: "John Smith",
      country: "🇺🇸",
      avatar: "JS",
      status: "online",
    },
    {
      name: "Anna Mueller",
      country: "🇩🇪",
      avatar: "AM",
      status: "away",
    },
    {
      name: "Sophie Martin",
      country: "🇫🇷",
      avatar: "SM",
      status: "online",
    },
  ];

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Groups List - Left Sidebar */}
      <div className="w-full lg:w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Study Groups
            </h1>
            <Dialog open={newGroupDialog} onOpenChange={setNewGroupDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Study Group</DialogTitle>
                  <DialogDescription>
                    Create a new study group to connect with other language
                    learners from around the world.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Group Name"
                    value={newGroupForm.name}
                    onChange={(e) =>
                      setNewGroupForm({
                        ...newGroupForm,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Language (e.g., Spanish, French)"
                    value={newGroupForm.language}
                    onChange={(e) =>
                      setNewGroupForm({
                        ...newGroupForm,
                        language: e.target.value,
                      })
                    }
                  />
                  <Select
                    value={newGroupForm.level}
                    onValueChange={(value) =>
                      setNewGroupForm({
                        ...newGroupForm,
                        level: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Group Description"
                    value={newGroupForm.description}
                    onChange={(e) =>
                      setNewGroupForm({
                        ...newGroupForm,
                        description: e.target.value,
                      })
                    }
                  />
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleCreateGroup}
                  >
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedGroup === group.id
                  ? "bg-green-50 border-l-4 border-l-green-500"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium text-gray-900 mr-2">
                      {group.name}
                    </h3>
                    {group.isJoined && (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 text-xs"
                      >
                        Joined
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {group.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 space-x-3 mb-2">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {group.members}
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      {group.online} online
                    </div>
                    <Badge
                      className={getLevelColor(group.level)}
                      variant="outline"
                    >
                      {group.level}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    {group.isJoined ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeaveGroup(group.id);
                        }}
                        className="text-red-600 hover:text-red-700 border-red-200"
                      >
                        <UserMinus className="w-3 h-3 mr-1" />
                        Leave
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinGroup(group.id);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Join
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGroup(group.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - Main Content */}
      {selectedGroup && selectedGroupData ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  {selectedGroupData.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedGroupData.members} members •{" "}
                  {selectedGroupData.online} online
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Voice call feature coming soon!")}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Voice Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Video call feature coming soon!")}
                >
                  <Video className="w-4 h-4 mr-1" />
                  Video Call
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedGroupData.messages.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-600">
                  Be the first to start a conversation!
                </p>
              </div>
            ) : (
              selectedGroupData.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-xs lg:max-w-md ${
                      message.isMe ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-700">
                          <img
                            src={message.avatar}
                            alt="avatar"
                            className="rounded-full"
                          />
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mx-2 ${
                        message.isMe ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-medium text-gray-900 mr-1">
                          {message.userName}
                        </span>
                        <span className="text-sm">{message.userCountry}</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.isMe
                            ? "bg-green-600 text-white"
                            : "bg-white text-gray-900 border"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Select a Study Group
            </h2>
            <p className="text-gray-600 mb-4">
              Choose a group to start chatting with international students
            </p>
            <p className="text-sm text-gray-500">
              Join groups to practice languages with native speakers worldwide
            </p>
          </div>
        </div>
      )}

      {/* Online Members - Right Sidebar (Desktop Only) */}
      {selectedGroup && (
        <div className="hidden lg:block w-64 bg-white border-l border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Online Members</h3>
          </div>
          <div className="p-4 space-y-3">
            {onlineMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 relative">
                    <span className="text-xs font-medium text-green-700">
                      {member.avatar}
                    </span>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === "online"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.name}
                    </p>
                    <div className="flex items-center">
                      <span className="text-sm mr-1">{member.country}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast.info("Private messaging coming soon!")}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
