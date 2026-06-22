export type Theme = "light" | "space" | "aurora";

export type Identity = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  accent: string;
};

export type TimelineEntry = {
  period: string;
  title: string;
  description: string;
  tag: string;
  note?: {
    label: string;
    title: string;
    description: string;
  };
};

export type ResumeProject = {
  category: string;
  title: string;
  meta: string;
  description: string;
  points: string[];
  stack: string[];
};

export const profile = {
  name: "彭方",
  englishName: "Peng Fang",
  roles: ["学生", "程序员", "连续创业者", "技术爱好者与极客"],
  summary:
    "从软件工程到计算机科学，从 AI 应用编程到产品创造。我正在持续学习、深入行业，并寻找值得长期投入的创业方向。",
  github: "https://github.com/IvanKnev",
  githubHandle: "IvanKnev",
  qq: "2210846296",
};

export const identities: Identity[] = [
  {
    eyebrow: "01 / LEARN",
    title: "学生",
    description:
      "保持好奇，持续补全认知地图。学习不是阶段，而是一种工作方式。",
    image: "./images/student.png",
    accent: "#d99b24",
  },
  {
    eyebrow: "02 / BUILD",
    title: "程序员",
    description:
      "用代码拆解问题，也用代码把想法变成可以真实体验的产品。",
    image: "./images/programmer.png",
    accent: "#2997ff",
  },
  {
    eyebrow: "03 / CREATE",
    title: "连续创业者",
    description:
      "从一人公司出发，验证真实需求，打磨产品，再与优秀的人一起走得更远。",
    image: "./images/founder.png",
    accent: "#ff6b45",
  },
  {
    eyebrow: "04 / EXPLORE",
    title: "技术爱好者与极客",
    description:
      "探索 AI、软件与硬件的边界，在快速变化的技术浪潮里保持动手能力。",
    image: "./images/geek.png",
    accent: "#8d67ff",
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "本科",
    title: "电子科技大学 · 软件工程",
    description:
      "建立系统的软件工程基础，GPA 3.72/4.0，曾获学业特等奖学金，并持续训练从需求分析到工程实现的完整能力。",
    tag: "Foundation",
    note: {
      label: "同期实践",
      title: "中国商飞 · 实习经历",
      description:
        "嵌合在本科阶段的真实业务实践，理解大型国有企业中的工程协作与产品落地。",
    },
  },
  {
    period: "硕士",
    title: "香港大学 · 计算机科学",
    description:
      "拓展计算机科学视野，在更开放的环境中深化技术认知与国际化思考。",
    tag: "Growth",
  },
  {
    period: "现在",
    title: "AI 应用编程与算法",
    description:
      "深入学习 AI 应用编程、Vibe Coding 与 AI 算法，探索新一代软件开发方式。",
    tag: "AI Native",
  },
  {
    period: "2026.07 起",
    title: "深入科技行业",
    description:
      "计划进入科技大厂实践，观察行业现状与 AI 科技进展，寻找有价值的创业切入点。",
    tag: "Next",
  },
  {
    period: "未来",
    title: "从一人公司到产品团队",
    description:
      "自主创业，从一人公司起步，逐步组建团队，开发真正解决问题的软件与硬件产品。",
    tag: "Vision",
  },
];

export const themes: Array<{ id: Theme; label: string; color: string }> = [
  { id: "light", label: "苹果白", color: "#f5f5f7" },
  { id: "space", label: "深空黑", color: "#101014" },
  { id: "aurora", label: "极光蓝", color: "#3757f5" },
];

export const resumeProjects: ResumeProject[] = [
  {
    category: "商飞实习 · 智能研发产品部",
    title: "C929 载荷处理与计算自动化框架软件项目",
    meta: "软件开发助理 · 2025.02 - 2025.08",
    description:
      "将智能数据分析能力适配到 C929 载荷处理场景，聚焦数据解析、AI 图表配置生成、异步任务解耦与请求治理。",
    points: [
      "设计后端 Prompt 模板，将用户数据与分析需求转化为可渲染的 JSON 图表配置和洞察结果，支撑前端可视化展示。",
      "使用 Alibaba EasyExcel 解析 XLSX 并压缩为 CSV，提升单次输入数据容量并降低 AIGC Token 消耗。",
      "引入 RabbitMQ 持久化消息与 Direct Exchange 路由，解耦 AI 处理流程，降低长任务阻塞与消息丢失风险。",
      "基于 Redisson RateLimiter 实现分布式限流，约束单用户请求频率，防止恶意消耗系统资源。",
    ],
    stack: ["Java", "Spring Boot", "AIGC API", "EasyExcel", "RabbitMQ", "Redis", "Redisson"],
  },
  {
    category: "商飞实习 · AI 超级智能体",
    title: "商飞数字人“小 C”项目",
    meta: "大模型应用与 RAG 工程",
    description:
      "参与企业级 AI Agent 能力建设，围绕统一模型调用、多轮记忆、知识库检索增强和工具调用进行后端开发。",
    points: [
      "基于 Spring AI 集成通义、Ollama 等大模型，封装统一调用接口，支持不同业务场景下的模型切换。",
      "使用 MessageChatMemoryAdvisor 与 ChatMemory 维护多轮对话上下文，并通过 Kryo 序列化持久化历史，降低服务重启后的记忆丢失风险。",
      "使用 MarkdownDocumentReader、KeywordMetadataEnricher、EmbeddingModel 与 PGvector 构建 RAG 文档处理、向量存储和语义检索链路。",
      "结合 RetrievalAugmentationAdvisor、相似度阈值、元数据过滤和多查询改写，提升召回率与回答准确性。",
      "开发文件操作、网页搜索、网页抓取、终端操作、资源下载、PDF 生成等工具调用能力，并通过 Spring AI MCP Server 接入 Pexels 图片搜索服务。",
    ],
    stack: ["Spring AI", "RAG", "PGvector", "MCP", "Kryo", "Ollama", "Tongyi"],
  },
  {
    category: "科研论文",
    title: "基于 LSTM 的短期电力负荷预测研究",
    meta: "共同第一作者（排名第一）· IEEE ICAESG 2025",
    description:
      "围绕 15 分钟粒度电力负荷数据构建轻量级 LSTM 预测模型，完成数据清洗、建模、评估与递归预测。",
    points: [
      "使用 Pandas、箱线图与 IQR 方法处理时间索引、异常值和归一化，构建完整数据预处理流程。",
      "设计长度为 16 的滑动窗口，将单变量时序转换为三维输入张量，并按 8:2 划分训练集与测试集。",
      "基于 TensorFlow Dataset API、Keras LSTM、Adam 与 MAE 搭建训练管线，并用 ModelCheckpoint 保存最优权重。",
      "使用 R²、均方根相对误差、损失曲线和预测对比图评估模型表现，并递归预测未来 48 个负荷点。",
    ],
    stack: ["Python", "Pandas", "TensorFlow", "Keras", "LSTM", "Matplotlib", "Seaborn"],
  },
  {
    category: "科研项目",
    title: "面向硬件系统的深度学习图像识别研究",
    meta: "中国科学院计算技术研究所 · 2024.07 - 2024.12",
    description:
      "围绕车道检测模型进行轻量化与精度优化，重点关注嵌入式或资源受限场景下的实时性与泛化能力。",
    points: [
      "研究并优化车道检测算法，提升复杂场景下的鲁棒性、实时性和泛化能力。",
      "引入量化与剪枝降低模型存储占用和计算复杂度，使模型更适合资源受限环境部署。",
      "加入自注意力机制增强关键区域特征表达，改善细节保留与检测精度。",
    ],
    stack: ["Deep Learning", "Computer Vision", "Model Compression", "Attention", "Python"],
  },
  {
    category: "数学建模竞赛",
    title: "基于遗传算法与 Wilcoxon 符号秩检验的多通道 LED 光谱研究",
    meta: "华数杯全国大学生数学建模竞赛二等奖 · 核心成员",
    description:
      "面向五通道 LED 光谱优化，建立日间显色与夜间节律干扰的双场景模型，并使用统计检验验证优化效果。",
    points: [
      "构建红、绿、蓝、暖白、冷白五通道 LED 的权重优化模型，兼顾色温、显色指数与褪黑素日光照度比约束。",
      "基于全天太阳光谱数据建立“追踪日光”控制模型，通过滑动窗口和平滑约束实现动态光谱适配。",
      "对 11 名参与者睡眠数据进行预处理，使用 Wilcoxon 符号秩检验与 Holm 校正验证优化照明效果。",
      "使用 Python 完成数据处理、模型求解、统计检验与 SPD 曲线、收敛曲线等可视化。",
    ],
    stack: ["Python", "Genetic Algorithm", "Statistical Testing", "Matplotlib", "Optimization"],
  },
];
