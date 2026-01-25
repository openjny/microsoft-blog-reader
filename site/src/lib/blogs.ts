/**
 * Blog metadata for Microsoft Tech Community.
 *
 * Terminology:
 * - board: The identifier extracted from RSS URL (/t5/{board}/...)
 * - boardId: Normalized board identifier (lowercase, no hyphens/underscores)
 * - category: Official Tech Community category (used in URL: /category/{category}/blog/{boardId})
 * - group: Project-defined UI grouping for filtering (Azure, Microsoft 365, Security, Others)
 * - displayName: User-friendly name for the blog
 */

export type Group = "Azure" | "Microsoft 365" | "Security" | "Others";

export interface BoardMetadata {
  displayName: string;
  category: string;
  group: Group;
}

/**
 * Blog metadata indexed by normalized boardId.
 * Keys are normalized (lowercase, no hyphens/underscores).
 */
export const BOARDS: Record<string, BoardMetadata> = {
  // ============================================
  // Azure
  // ============================================
  // AI
  aiplatformblog: {
    displayName: "AI Platform",
    category: "azure",
    group: "Azure",
  },
  azureaifoundryblog: {
    displayName: "Microsoft Foundry",
    category: "azure-ai-foundry",
    group: "Azure",
  },
  azureaiservicesblog: {
    displayName: "Azure AI Services",
    category: "azure",
    group: "Azure",
  },
  machinelearningblog: {
    displayName: "Machine Learning",
    category: "azure",
    group: "Azure",
  },
  mixedrealitylink: {
    displayName: "Mixed Reality Link",
    category: "azure",
    group: "Azure",
  },
  themixedrealityblog: {
    displayName: "The Mixed Reality",
    category: "azure",
    group: "Azure",
  },
  // Analytics
  analyticsonazure: {
    displayName: "Analytics on Azure",
    category: "azure",
    group: "Azure",
  },
  azuresynapseanalyticsblog: {
    displayName: "Azure Synapse Analytics",
    category: "azuredatabases",
    group: "Azure",
  },
  // Arc
  azurearcblog: { displayName: "Azure Arc", category: "azure", group: "Azure" },
  // Architecture
  azurearchitectureblog: {
    displayName: "Azure Architecture",
    category: "azure",
    group: "Azure",
  },
  azureforisvandstartupstechnicalblog: {
    displayName: "Azure for ISV and Startups Technical",
    category: "azure",
    group: "Azure",
  },
  microsoftmechanicsblog: {
    displayName: "Microsoft Mechanics",
    category: "microsoftmechanics",
    group: "Azure",
  },
  microsoftmissioncriticalblog: {
    displayName: "Microsoft Mission Critical",
    category: "microsoftmissioncriticalcommunityhub",
    group: "Azure",
  },
  startupsatmicrosoftblog: {
    displayName: "Startups at Microsoft",
    category: "startupsatmicrosoft",
    group: "Azure",
  },
  // Cloud Infrastructure
  azurecompute: {
    displayName: "Azure Compute",
    category: "azure",
    group: "Azure",
  },
  azureinfragurus: {
    displayName: "Azure Infra Gurus",
    category: "azure",
    group: "Azure",
  },
  azureinfrastructureblog: {
    displayName: "Azure Infrastructure",
    category: "azure",
    group: "Azure",
  },
  azurestackblog: {
    displayName: "Azure Stack",
    category: "azure",
    group: "Azure",
  },
  azurestorageblog: {
    displayName: "Azure Storage",
    category: "azure",
    group: "Azure",
  },
  // Containers
  containers: {
    displayName: "Containers",
    category: "windows-server",
    group: "Azure",
  },
  // Data
  azuredatablog: {
    displayName: "Azure Data",
    category: "azuredatabases",
    group: "Azure",
  },
  azuredataexplorer: {
    displayName: "Azure Data Explorer",
    category: "azuredatabases",
    group: "Azure",
  },
  azuredatafactoryblog: {
    displayName: "Azure Data Factory",
    category: "azuredatabases",
    group: "Azure",
  },
  dataarchitectureblog: {
    displayName: "Data Architecture",
    category: "dataarchitecture",
    group: "Azure",
  },
  microsoftgraphdataconnectforsharepo: {
    displayName: "Microsoft Graph Data Connect for SharePoint",
    category: "content_management",
    group: "Azure",
  },
  microsoftdatamigration: {
    displayName: "Microsoft Data Migration",
    category: "azuredatabases",
    group: "Azure",
  },
  // Database
  adformysql: {
    displayName: "Azure Database for MySQL",
    category: "azuredatabases",
    group: "Azure",
  },
  adforpostgresql: {
    displayName: "Azure Database for PostgreSQL",
    category: "azuredatabases",
    group: "Azure",
  },
  azuresqlblog: {
    displayName: "Azure SQL",
    category: "azuredatabases",
    group: "Azure",
  },
  oracleonazureblog: {
    displayName: "Oracle on Azure",
    category: "azure",
    group: "Azure",
  },
  sqlserver: {
    displayName: "SQL Server",
    category: "sql-server",
    group: "Azure",
  },
  sqlserversupport: {
    displayName: "SQLServer Support",
    category: "sql-server",
    group: "Azure",
  },
  ssis: { displayName: "SSIS", category: "sql-server", group: "Azure" },
  azuredbsupport: {
    displayName: "Azure Database Support",
    category: "azuredatabases",
    group: "Azure",
  },
  // Development
  azuredevcommunityblog: {
    displayName: "Microsoft Developer Community",
    category: "azure",
    group: "Azure",
  },
  azurefederaldeveloperconnect: {
    displayName: "Azure Federal Developer Connect",
    category: "azure",
    group: "Azure",
  },
  educatordeveloperblog: {
    displayName: "Educator Developer",
    category: "microsoft-learn-for-educators",
    group: "Azure",
  },
  studentdeveloperblog: {
    displayName: "Student Developer",
    category: "educationsector",
    group: "Azure",
  },
  // FinOps
  finopsblog: { displayName: "FinOps", category: "azure", group: "Azure" },
  // Governance
  azuregovernanceandmanagementblog: {
    displayName: "Azure Governance and Management",
    category: "azure",
    group: "Azure",
  },
  // HPC
  azurehighperformancecomputingblog: {
    displayName: "Azure High Performance Computing",
    category: "azure",
    group: "Azure",
  },
  // Linux
  linuxandopensourceblog: {
    displayName: "Linux and Open Source",
    category: "azure",
    group: "Azure",
  },
  // Networking
  azurenetworkingblog: {
    displayName: "Azure Networking",
    category: "azure",
    group: "Azure",
  },
  azurenetworksecurityblog: {
    displayName: "Azure Network Security",
    category: "azure",
    group: "Azure",
  },
  networkingblog: {
    displayName: "Networking",
    category: "windows-server",
    group: "Azure",
  },
  // PaaS
  adsapiblog: { displayName: "Ads API", category: "bing", group: "Azure" },
  appsonazureblog: {
    displayName: "Apps on Azure",
    category: "azure",
    group: "Azure",
  },
  azurecommunicationservicesblog: {
    displayName: "Azure Communication Services",
    category: "azure",
    group: "Azure",
  },
  azureconfidentialcomputingblog: {
    displayName: "Azure Confidential Computing",
    category: "azure",
    group: "Azure",
  },
  azuremapsblog: {
    displayName: "Azure Maps",
    category: "azure",
    group: "Azure",
  },
  azurepaasblog: {
    displayName: "Azure PaaS",
    category: "azure",
    group: "Azure",
  },
  azurespaceblog: {
    displayName: "Azure Space",
    category: "azure",
    group: "Azure",
  },
  modernizationbestpracticesblog: {
    displayName: "Modernization Best Practices",
    category: "azuredatabases",
    group: "Azure",
  },
  modernworkappconsult: {
    displayName: "Modern Work App Consult",
    category: "microsoft365",
    group: "Azure",
  },
  // SAP
  sapapplications: {
    displayName: "SAP Applications",
    category: "saponmicrosoft",
    group: "Azure",
  },
  // Virtualization
  azurevirtualdesktopblog: {
    displayName: "Azure Virtual Desktop",
    category: "azure",
    group: "Azure",
  },
  fslogixblog: { displayName: "FSLogix", category: "windows", group: "Azure" },

  // ============================================
  // Microsoft 365
  // ============================================
  // Collaboration / Viva
  microsoftvivablog: {
    displayName: "Microsoft Viva",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivaamplify_blog: {
    displayName: "Viva Amplify",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivaconnectionsblog: {
    displayName: "Viva Connections",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivaengageblog: {
    displayName: "Viva Engage",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivaglintblog: {
    displayName: "Viva Glint",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivaglintpartnersblogboard: {
    displayName: "Viva Glint Partners",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivainsightsblog: {
    displayName: "Viva Insights",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivalearningblog: {
    displayName: "Viva Learning",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivapulseblog: {
    displayName: "Viva Pulse",
    category: "microsoft-viva",
    group: "Microsoft 365",
  },
  vivasalesblog: {
    displayName: "Viva Sales",
    category: "microsoftviva",
    group: "Microsoft 365",
  },
  // Copilot
  microsoft365copilotblog: {
    displayName: "Microsoft 365 Copilot",
    category: "microsoft365copilot",
    group: "Microsoft 365",
  },
  securitycopilotblog: {
    displayName: "Microsoft Security Copilot",
    category: "microsoft-security",
    group: "Microsoft 365",
  },
  // Exchange
  exchange: {
    displayName: "Exchange",
    category: "exchange",
    group: "Microsoft 365",
  },
  // Microsoft 365
  m365gcchcommunityhubblogboard: {
    displayName: "M365 GCCH Community Hub",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  microsoft365businessblog: {
    displayName: "Small and Medium Business",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  microsoft365insiderblog: {
    displayName: "Microsoft 365 Insider",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  microsoft365archiveblog: {
    displayName: "Microsoft 365 Archive",
    category: "content_management",
    group: "Microsoft 365",
  },
  microsoft365backupblog: {
    displayName: "Microsoft 365 Backup",
    category: "content_management",
    group: "Microsoft 365",
  },
  microsoft365blog: {
    displayName: "Microsoft 365",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  office365businessappsblog: {
    displayName: "Office 365 Business Apps",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  // Outlook
  outlook: {
    displayName: "Outlook",
    category: "outlook",
    group: "Microsoft 365",
  },
  // Productivity
  excelblog: {
    displayName: "Excel",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  microsoftedgeinsider: {
    displayName: "Microsoft Edge Insider",
    category: "microsoftedgeinsider",
    group: "Microsoft 365",
  },
  microsoftformsblog: {
    displayName: "Microsoft Forms",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  microsoftteamsblog: {
    displayName: "Microsoft Teams",
    category: "microsoftteams",
    group: "Microsoft 365",
  },
  microsoftteamscommunityblog: {
    displayName: "Microsoft Teams Community",
    category: "microsoftteams",
    group: "Microsoft 365",
  },
  microsoftteamssupport: {
    displayName: "Microsoft Teams Support",
    category: "microsoftteams",
    group: "Microsoft 365",
  },
  officeeos: {
    displayName: "Office End Of Support",
    category: "officeeos",
    group: "Microsoft 365",
  },
  onedriveblog: {
    displayName: "Microsoft OneDrive",
    category: "onedriveforbusiness",
    group: "Microsoft 365",
  },
  plannerblog: {
    displayName: "Planner",
    category: "planner",
    group: "Microsoft 365",
  },
  projectblog: {
    displayName: "Project",
    category: "project",
    group: "Microsoft 365",
  },
  projectsupport: {
    displayName: "Project Support",
    category: "project",
    group: "Microsoft 365",
  },
  sharepointembedded: {
    displayName: "SharePoint Embedded",
    category: "content_management",
    group: "Microsoft 365",
  },
  sharepointpremiumblog: {
    displayName: "SharePoint Premium",
    category: "content_management",
    group: "Microsoft 365",
  },
  skypeforbusinessblog: {
    displayName: "Skype for Business",
    category: "skypeforbusiness",
    group: "Microsoft 365",
  },
  streamblog: {
    displayName: "Stream",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  teamsfreeblog: {
    displayName: "Microsoft Teams (free)",
    category: "microsoftteams",
    group: "Microsoft 365",
  },
  accessblog: {
    displayName: "Access",
    category: "microsoft365",
    group: "Microsoft 365",
  },
  spblog: {
    displayName: "Microsoft SharePoint",
    category: "content_management",
    group: "Microsoft 365",
  },

  // ============================================
  // Security
  // ============================================
  // Identity
  microsoftentrablog: {
    displayName: "Microsoft Entra",
    category: "microsoft-security",
    group: "Security",
  },
  // Security
  azurepurviewblog: {
    displayName: "Azure Purview",
    category: "microsoft-security",
    group: "Security",
  },
  coreinfrastructureandsecurityblog: {
    displayName: "Core Infrastructure and Security",
    category: "microsoft-security",
    group: "Security",
  },
  defenderexternalattacksurfacemgmtblog: {
    displayName: "Defender External Attack Surface Mgmt",
    category: "microsoft-security",
    group: "Security",
  },
  defenderthreatintelligence: {
    displayName: "Defender Threat Intelligence",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftsecuritybaselines: {
    displayName: "Microsoft Security Baselines",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftsecurityblog: {
    displayName: "Microsoft Security",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftdefenderatpblog: {
    displayName: "Microsoft Defender ATP",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftdefendercloudblog: {
    displayName: "Microsoft Defender Cloud",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftdefenderforoffice365blog: {
    displayName: "Microsoft Defender for Office 365",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftdefenderiotblog: {
    displayName: "Microsoft Defender IoT",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftsecurityexperts: {
    displayName: "Microsoft Security Experts",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftsentinelblog: {
    displayName: "Microsoft Sentinel",
    category: "microsoft-security",
    group: "Security",
  },
  microsoftthreatprotectionblog: {
    displayName: "Microsoft Defender XDR",
    category: "microsoft-security",
    group: "Security",
  },
  vulnerabilitymanagement: {
    displayName: "Vulnerability Management",
    category: "microsoft-security",
    group: "Security",
  },
  // Sysinternals
  sysinternalsblog: {
    displayName: "Sysinternals",
    category: "windows",
    group: "Security",
  },

  // ============================================
  // Others
  // ============================================
  // Communities
  communitynewsdesk: {
    displayName: "Community News Desk",
    category: "communitynewsdesk",
    group: "Others",
  },
  educationblog: {
    displayName: "Education",
    category: "educationsector",
    group: "Others",
  },
  healthcareandlifesciencesblog: {
    displayName: "Healthcare And Life Sciences",
    category: "healthcareandlifesciences",
    group: "Others",
  },
  iltcommunicationblog: {
    displayName: "ILT Communication",
    category: "partnercommunity",
    group: "Others",
  },
  manufacturing: {
    displayName: "Manufacturing",
    category: "azure",
    group: "Others",
  },
  marketplaceblog: {
    displayName: "Marketplace",
    category: "partnercommunity",
    group: "Others",
  },
  microsoftindustryblog: {
    displayName: "Microsoft Industry",
    category: "azure",
    group: "Others",
  },
  microsoftlearnblog: {
    displayName: "Microsoft Learn",
    category: "microsoftlearn",
    group: "Others",
  },
  mvpblog: {
    displayName: "Microsoft MVP Program",
    category: "mvp",
    group: "Others",
  },
  nonprofittechies: {
    displayName: "Non profit Techies",
    category: "microsoftfornonprofits",
    group: "Others",
  },
  publicsectorblog: {
    displayName: "Public Sector",
    category: "publicsector",
    group: "Others",
  },
  // Endpoints
  configurationmanagerblog: {
    displayName: "Configuration Manager",
    category: "microsoftintune",
    group: "Others",
  },
  devicemanagementmicrosoft: {
    displayName: "Device Management Microsoft",
    category: "microsoftintune",
    group: "Others",
  },
  intunecustomersuccess: {
    displayName: "Intune Customer Success",
    category: "microsoftintune",
    group: "Others",
  },
  microsoftintuneblog: {
    displayName: "Microsoft Intune",
    category: "microsoftintune",
    group: "Others",
  },
  systemcenterblog: {
    displayName: "System Center",
    category: "systemcenter",
    group: "Others",
  },
  // FastTrack
  fasttrackblog: {
    displayName: "Fast Track",
    category: "fasttrack",
    group: "Others",
  },
  fasttrackforazureblog: {
    displayName: "Fast Track for Azure",
    category: "fasttrack",
    group: "Others",
  },
  // Hardware
  hardwaredevcenter: {
    displayName: "Hardware Dev Center",
    category: "winhec-online",
    group: "Others",
  },
  microsoftdeviceecosystemplatformblog: {
    displayName: "Microsoft Device Ecosystem Platform",
    category: "microsoftdeviceecosystemplatform",
    group: "Others",
  },
  surfaceitpro: {
    displayName: "Surface IT Pro",
    category: "surfacedevices",
    group: "Others",
  },
  // IIS
  iissupportblog: {
    displayName: "IIS Support",
    category: "microsoft-iis",
    group: "Others",
  },
  // IoT
  iotblog: { displayName: "IoT", category: "iot", group: "Others" },
  // IT Ops
  itopstalkblog: {
    displayName: "IT Ops Talk",
    category: "itopstalk",
    group: "Others",
  },
  // Others
  askds: {
    displayName: "Ask Directory Services",
    category: "azure",
    group: "Others",
  },
  azurelabservicesblog: {
    displayName: "Azure Lab Services",
    category: "azure",
    group: "Others",
  },
  azuremigrationblog: {
    displayName: "Azure Migration and Modernization",
    category: "azure",
    group: "Others",
  },
  azureobservabilityblog: {
    displayName: "Azure Observability",
    category: "azure",
    group: "Others",
  },
  azuretoolsblog: {
    displayName: "Azure Tools",
    category: "azure",
    group: "Others",
  },
  corporatecommunicationsblog: {
    displayName: "Corporate Communications",
    category: "corporate_communications",
    group: "Others",
  },
  drivingadoptionblog: {
    displayName: "Driving Adoption",
    category: "drivingadoption",
    group: "Others",
  },
  filecab: { displayName: "File CAB", category: "azure", group: "Others" },
  integrationsonazureblog: {
    displayName: "Integrations on Azure",
    category: "azure",
    group: "Others",
  },
  messagingonazureblog: {
    displayName: "Messaging on Azure",
    category: "azure",
    group: "Others",
  },
  microsoftusbblog: {
    displayName: "Microsoft USB",
    category: "microsoftusb",
    group: "Others",
  },
  smallbasic: {
    displayName: "Small Basic",
    category: "azure",
    group: "Others",
  },
  weeklyroundupblog: {
    displayName: "Weekly Roundup",
    category: "azure",
    group: "Others",
  },
  // Partners
  partnermarketingasaserviceblogboard: {
    displayName: "Partner Marketing as a Service",
    category: "partnercommunity",
    group: "Others",
  },
  partnernews: {
    displayName: "Partner News",
    category: "partnercommunity",
    group: "Others",
  },
  // Windows
  windowsadmincenterblog: {
    displayName: "Windows Admin Center",
    category: "windows",
    group: "Others",
  },
  windowsitproblog: {
    displayName: "Windows IT Pro",
    category: "windows",
    group: "Others",
  },
  windowsdriverdev: {
    displayName: "Windows Driver Dev",
    category: "windows",
    group: "Others",
  },
  windowshardwarecertification: {
    displayName: "Windows Hardware Certification",
    category: "winhec-online",
    group: "Others",
  },
};

/**
 * Aliases mapping raw board names (from RSS URLs) to normalized boardIds.
 * Used when the URL slug differs significantly from the normalized canonical ID.
 */
export const ALIASES: Record<string, string> = {
  // URL slug -> normalized boardId
  microsoftfoundryblog: "azureaifoundryblog",
  healthcareandlifesciences: "healthcareandlifesciencesblog",
  iltcommunicationsblog: "iltcommunicationblog",
  azuredatabasesupportblog: "azuredbsupport",
  exchangeteamblog: "exchange",
};

/**
 * List of available groups for UI filtering.
 */
export const GROUPS: Group[] = ["Azure", "Microsoft 365", "Security", "Others"];

/**
 * Normalize a board name to a canonical boardId.
 * Removes hyphens and underscores, converts to lowercase.
 */
export function normalizeBoard(board: string): string {
  return board.toLowerCase().replace(/[-_]/g, "");
}

/**
 * Resolve a raw board name to its canonical boardId.
 * Applies normalization and then checks aliases.
 */
export function resolveBoardId(board: string): string {
  const normalized = normalizeBoard(board);
  return ALIASES[normalized] ?? normalized;
}

/**
 * Get metadata for a board by its raw name (from RSS URL).
 * Returns undefined if no metadata is found.
 */
export function getBlogMetadata(board: string): BoardMetadata | undefined {
  const boardId = resolveBoardId(board);
  return BOARDS[boardId];
}

/**
 * Get the group for a board by its raw name.
 * Returns "Others" if no metadata is found.
 */
export function getBoardGroup(board: string): Group {
  const metadata = getBlogMetadata(board);
  return metadata?.group ?? "Others";
}

/**
 * Get all normalized boardIds that belong to a specific group.
 */
export function getBoardIdsForGroup(group: Group): string[] {
  return Object.entries(BOARDS)
    .filter(([, meta]) => meta.group === group)
    .map(([boardId]) => boardId);
}

/**
 * Check if a raw board name belongs to a specific group.
 */
export function boardBelongsToGroup(board: string, group: Group): boolean {
  const boardId = resolveBoardId(board);
  const metadata = BOARDS[boardId];
  return metadata?.group === group;
}

/**
 * Build the Tech Community URL for a board.
 */
export function getBlogUrl(board: string | null): string | undefined {
  if (!board) return undefined;

  const boardId = resolveBoardId(board);
  const metadata = BOARDS[boardId];
  if (metadata) {
    return `https://techcommunity.microsoft.com/category/${metadata.category}/blog/${boardId}`;
  }

  return undefined;
}
