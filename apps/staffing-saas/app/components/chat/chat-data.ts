export type ChatChannel = "zalo_oa" | "website" | "in_app";

export type ChatPeerType = "candidate" | "worker" | "customer" | "group";

export type ChatSender = "bot" | "agent" | "peer" | "system";

export type ChatMessageKind = "message" | "announcement";

export interface ChatAnnouncement {
  id: string;
  title: string;
  body: string;
  postedBy: string;
  postedAt: string;
  acknowledgedCount?: number;
  totalRecipients?: number;
}

export interface ChatPeer {
  type: ChatPeerType;
  id: string;
  name: string;
  subtitle?: string;
}

export interface ChatAttachment {
  name: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  convId: string;
  sender: ChatSender;
  senderName?: string;
  text: string;
  at: string;
  attachments?: ChatAttachment[];
  kind?: ChatMessageKind;
  announcement?: ChatAnnouncement;
}

export interface ChatConversation {
  id: string;
  channel: ChatChannel;
  peer: ChatPeer;
  needsHuman: boolean;
  unreadCount: number;
  lastMessage: {
    text: string;
    sender: ChatSender;
    at: string;
  };
}

export const CHANNEL_META: Record<
  ChatChannel,
  { label: string; tone: "brand" | "warning" | "info" }
> = {
  zalo_oa: { label: "Zalo OA", tone: "brand" },
  website: { label: "website", tone: "info" },
  in_app: { label: "in-app", tone: "warning" },
};

export const CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: "c1",
    channel: "zalo_oa",
    peer: {
      type: "candidate",
      id: "cand-001",
      name: "Nguyễn Thị Hồng Nhung",
      subtitle: "Ứng viên — Phục vụ nhà hàng",
    },
    needsHuman: true,
    unreadCount: 2,
    lastMessage: {
      text: "Em muốn hỏi thêm về ca tối thứ 7 ạ, có thể chat với nhân viên không?",
      sender: "peer",
      at: "10:42",
    },
  },
  {
    id: "c2",
    channel: "zalo_oa",
    peer: {
      type: "candidate",
      id: "cand-002",
      name: "Trần Văn Khải",
      subtitle: "Ứng viên — Bảo vệ sự kiện",
    },
    needsHuman: true,
    unreadCount: 1,
    lastMessage: {
      text: "Mức lương ca đêm là bao nhiêu vậy ạ? Cho em xin gặp nhân viên.",
      sender: "peer",
      at: "10:25",
    },
  },
  {
    id: "c3",
    channel: "website",
    peer: {
      type: "candidate",
      id: "lead-014",
      name: "Lê Minh Quân",
      subtitle: "Lead từ landing page Tuyển CTV",
    },
    needsHuman: false,
    unreadCount: 0,
    lastMessage: {
      text: "Cảm ơn anh đã quan tâm. Em đã gửi lịch phỏng vấn qua email.",
      sender: "agent",
      at: "09:58",
    },
  },
  {
    id: "c4",
    channel: "in_app",
    peer: {
      type: "worker",
      id: "wk-3127",
      name: "Phạm Hoàng Nam",
      subtitle: "CTV — SWAT Q1, đang làm ca tại Lotte Mart",
    },
    needsHuman: false,
    unreadCount: 0,
    lastMessage: {
      text: "Em check-in trễ 5 phút do kẹt xe ạ, anh duyệt giúp em.",
      sender: "peer",
      at: "09:30",
    },
  },
  {
    id: "c5",
    channel: "zalo_oa",
    peer: {
      type: "customer",
      id: "cust-aeon-tanphu",
      name: "AEON Tân Phú — Chị Hằng",
      subtitle: "HR Manager, hợp đồng staffing thường xuyên",
    },
    needsHuman: false,
    unreadCount: 3,
    lastMessage: {
      text: "Bên em cần bổ sung 5 CTV cho tuần sau, anh xem hộ.",
      sender: "peer",
      at: "Hôm qua",
    },
  },
  {
    id: "c6",
    channel: "in_app",
    peer: {
      type: "group",
      id: "grp-ca-toi-q1",
      name: "Nhóm CTV ca tối Q1",
      subtitle: "12 thành viên · Tạo bởi Lê Quản Trị",
    },
    needsHuman: false,
    unreadCount: 5,
    lastMessage: {
      text: "Mọi người confirm ca tối thứ 7 giúp em với ạ.",
      sender: "peer",
      at: "Hôm qua",
    },
  },
  {
    id: "c7",
    channel: "in_app",
    peer: {
      type: "candidate",
      id: "cand-008",
      name: "Vũ Thị Mai",
      subtitle: "Ứng viên — Pha chế",
    },
    needsHuman: false,
    unreadCount: 0,
    lastMessage: {
      text: "Bot đã trả lời câu hỏi về quy trình tuyển dụng.",
      sender: "bot",
      at: "Hôm qua",
    },
  },
  {
    id: "c8",
    channel: "zalo_oa",
    peer: {
      type: "worker",
      id: "wk-2980",
      name: "Đặng Quốc Hùng",
      subtitle: "CTV — Bảo vệ",
    },
    needsHuman: false,
    unreadCount: 0,
    lastMessage: {
      text: "Em đã nhận lương ca tuần trước, cảm ơn anh ạ.",
      sender: "peer",
      at: "2 ngày trước",
    },
  },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    {
      id: "c1-m1",
      convId: "c1",
      sender: "peer",
      text: "Chào shop, em muốn ứng tuyển làm CTV phục vụ ạ.",
      at: "10:30",
    },
    {
      id: "c1-m2",
      convId: "c1",
      sender: "bot",
      senderName: "Trợ lý ảo",
      text: "Chào bạn! Cảm ơn bạn đã quan tâm. Bạn có thể cho mình biết bạn quan tâm vị trí phục vụ ở khu vực nào không?",
      at: "10:30",
    },
    {
      id: "c1-m3",
      convId: "c1",
      sender: "peer",
      text: "Em ở quận Tân Phú ạ.",
      at: "10:35",
    },
    {
      id: "c1-m4",
      convId: "c1",
      sender: "bot",
      senderName: "Trợ lý ảo",
      text: "Hiện AEON Tân Phú đang cần 5 CTV phục vụ ca tối thứ 7 (17:00–23:00), lương 35.000đ/giờ + thưởng peak. Bạn có muốn ứng tuyển không?",
      at: "10:36",
    },
    {
      id: "c1-m5",
      convId: "c1",
      sender: "peer",
      text: "Em muốn hỏi thêm về ca tối thứ 7 ạ, có thể chat với nhân viên không?",
      at: "10:42",
    },
  ],
  c2: [
    {
      id: "c2-m1",
      convId: "c2",
      sender: "peer",
      text: "Anh ơi cho em hỏi ca đêm bảo vệ sự kiện lương bao nhiêu ạ?",
      at: "10:20",
    },
    {
      id: "c2-m2",
      convId: "c2",
      sender: "bot",
      senderName: "Trợ lý ảo",
      text: "Lương ca đêm bảo vệ sự kiện dao động 50.000–65.000đ/giờ tuỳ địa điểm và thời lượng. Bạn cho mình biết khu vực cụ thể nhé.",
      at: "10:21",
    },
    {
      id: "c2-m3",
      convId: "c2",
      sender: "peer",
      text: "Mức lương ca đêm là bao nhiêu vậy ạ? Cho em xin gặp nhân viên.",
      at: "10:25",
    },
  ],
  c3: [
    {
      id: "c3-m1",
      convId: "c3",
      sender: "peer",
      text: "Mình muốn tìm hiểu cơ hội làm CTV part-time cuối tuần.",
      at: "09:40",
    },
    {
      id: "c3-m2",
      convId: "c3",
      sender: "agent",
      senderName: "Lê Quản Trị",
      text: "Chào anh Quân, cảm ơn anh đã quan tâm. Em là Trị, phụ trách tuyển CTV khu vực HCM.",
      at: "09:45",
    },
    {
      id: "c3-m3",
      convId: "c3",
      sender: "agent",
      senderName: "Lê Quản Trị",
      text: "Cảm ơn anh đã quan tâm. Em đã gửi lịch phỏng vấn qua email.",
      at: "09:58",
    },
  ],
  c4: [
    {
      id: "c4-m1",
      convId: "c4",
      sender: "peer",
      text: "Em check-in trễ 5 phút do kẹt xe ạ, anh duyệt giúp em.",
      at: "09:30",
    },
  ],
  c5: [
    {
      id: "c5-m1",
      convId: "c5",
      sender: "peer",
      text: "Bên em cần bổ sung 5 CTV cho tuần sau, anh xem hộ.",
      at: "Hôm qua 16:20",
    },
    {
      id: "c5-m2",
      convId: "c5",
      sender: "peer",
      text: "Ca tối 17:00–23:00, vị trí phục vụ.",
      at: "Hôm qua 16:21",
      attachments: [
        { name: "Yeu_cau_bo_sung_CTV.xlsx", size: "32 KB" },
      ],
    },
  ],
  c6: [
    {
      id: "c6-ann1",
      convId: "c6",
      sender: "agent",
      senderName: "Lê Quản Trị",
      text: "",
      at: "Hôm qua 09:00",
      kind: "announcement",
      announcement: {
        id: "ann-c6-1",
        title: "Cập nhật quy định check-in ca tối — áp dụng từ 25/05",
        body: "Các bạn lưu ý quy định của kho: Tới trễ sau 30p bị trừ 1/2 thù lao ca, tới trễ sau 60p không nhận nữa.",
        postedBy: "Lê Quản Trị",
        postedAt: "Hôm qua 09:00",
        acknowledgedCount: 5,
        totalRecipients: 12,
      },
    },
    {
      id: "c6-m1",
      convId: "c6",
      sender: "peer",
      senderName: "Phạm Hoàng Nam",
      text: "Em confirm ca tối thứ 7 ạ.",
      at: "Hôm qua 14:10",
    },
    {
      id: "c6-m2",
      convId: "c6",
      sender: "peer",
      senderName: "Trần Văn Khải",
      text: "Em cũng tham gia ca tối thứ 7.",
      at: "Hôm qua 14:15",
    },
    {
      id: "c6-m3",
      convId: "c6",
      sender: "agent",
      senderName: "Lê Quản Trị",
      text: "Cảm ơn các bạn. Bạn nào chưa confirm thì confirm trước 20h tối nay nhé.",
      at: "Hôm qua 14:20",
    },
    {
      id: "c6-m4",
      convId: "c6",
      sender: "peer",
      senderName: "Vũ Thị Mai",
      text: "Mọi người confirm ca tối thứ 7 giúp em với ạ.",
      at: "Hôm qua 18:50",
    },
  ],
  c7: [
    {
      id: "c7-m1",
      convId: "c7",
      sender: "peer",
      text: "Quy trình tuyển dụng pha chế gồm những bước nào ạ?",
      at: "Hôm qua 11:00",
    },
    {
      id: "c7-m2",
      convId: "c7",
      sender: "bot",
      senderName: "Trợ lý ảo",
      text: "Quy trình gồm 3 bước: (1) Đăng ký hồ sơ trên app, (2) Phỏng vấn online 15 phút, (3) Thử việc 1 ca có lương. Bạn cần hỗ trợ bước nào?",
      at: "Hôm qua 11:01",
    },
  ],
  c8: [
    {
      id: "c8-m1",
      convId: "c8",
      sender: "agent",
      senderName: "Lê Quản Trị",
      text: "Anh đã chuyển lương ca tuần trước cho em rồi nhé.",
      at: "2 ngày trước",
    },
    {
      id: "c8-m2",
      convId: "c8",
      sender: "peer",
      text: "Em đã nhận lương ca tuần trước, cảm ơn anh ạ.",
      at: "2 ngày trước",
    },
  ],
};

export const CHAT_PINNED_ANNOUNCEMENTS: Record<string, ChatAnnouncement | undefined> = {
  c6: {
    id: "ann-c6-pin",
    title: "Cập nhật quy định check-in ca tối — áp dụng từ 25/05",
    body: "Từ thứ Bảy 25/05, CTV ca tối phải check-in qua app trước 16:45 (sớm hơn 15 phút). Trễ quá 10 phút sẽ bị trừ 30% lương ca. Nhắn nhân viên điều phối nếu kẹt xe để được xét duyệt.",
    postedBy: "Lê Quản Trị",
    postedAt: "23/05 09:00",
    acknowledgedCount: 8,
    totalRecipients: 12,
  },
};

export interface ChatHandoff {
  agentName: string;
}

export const CHAT_HANDOFF: Record<string, ChatHandoff | undefined> = {
  c3: { agentName: "Lê Quản Trị" },
  c4: { agentName: "Lê Quản Trị" },
  c5: { agentName: "Lê Quản Trị" },
  c6: { agentName: "Lê Quản Trị" },
  c8: { agentName: "Lê Quản Trị" },
};
