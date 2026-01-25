/**
 * Blog metadata with official Tech Community URL categories.
 * urlCategory matches the path segment in: /category/{urlCategory}/blog/{blog_id}
 */
export const BLOG_METADATA: Record<string, { name: string; urlCategory: string }> = {
  // Azure
  aiplatformblog: { name: "AI Platform", urlCategory: "azure" },
  "azure-ai-foundry-blog": { name: "Microsoft Foundry", urlCategory: "azure-ai-foundry" },
  "azure-ai-services-blog": { name: "Azure AI Services", urlCategory: "azure" },
  analyticsonazure: { name: "Analytics on Azure", urlCategory: "azure" },
  appsonazureblog: { name: "Apps on Azure", urlCategory: "azure" },
  azurearcblog: { name: "Azure Arc", urlCategory: "azure" },
  azurearchitectureblog: { name: "Azure Architecture", urlCategory: "azure" },
  azurecommunicationservicesblog: { name: "Azure Communication Services", urlCategory: "azure" },
  azurecompute: { name: "Azure Compute", urlCategory: "azure" },
  azureconfidentialcomputingblog: { name: "Azure Confidential Computing", urlCategory: "azure" },
  azuredevcommunityblog: { name: "Microsoft Developer Community", urlCategory: "azure" },
  azurefederaldeveloperconnect: { name: "Azure Federal Developer Connect", urlCategory: "azure" },
  azureforisvandstartupstechnicalblog: { name: "Azure for ISV and Startups Technical", urlCategory: "azure" },
  azuregovernanceandmanagementblog: { name: "Azure Governance and Management", urlCategory: "azure" },
  azurehighperformancecomputingblog: { name: "Azure High Performance Computing", urlCategory: "azure" },
  azureinfragurus: { name: "Azure Infra Gurus", urlCategory: "azure" },
  azureinfrastructureblog: { name: "Azure Infrastructure", urlCategory: "azure" },
  azurelabservicesblog: { name: "Azure Lab Services", urlCategory: "azure" },
  azuremapsblog: { name: "Azure Maps", urlCategory: "azure" },
  azuremigrationblog: { name: "Azure Migration and Modernization", urlCategory: "azure" },
  azurenetworkingblog: { name: "Azure Networking", urlCategory: "azure" },
  azurenetworksecurityblog: { name: "Azure Network Security", urlCategory: "azure" },
  azureobservabilityblog: { name: "Azure Observability", urlCategory: "azure" },
  azurepaasblog: { name: "Azure PaaS", urlCategory: "azure" },
  azurespaceblog: { name: "Azure Space", urlCategory: "azure" },
  azurestackblog: { name: "Azure Stack", urlCategory: "azure" },
  azurestorageblog: { name: "Azure Storage", urlCategory: "azure" },
  azuretoolsblog: { name: "Azure Tools", urlCategory: "azure" },
  azurevirtualdesktopblog: { name: "Azure Virtual Desktop", urlCategory: "azure" },
  finopsblog: { name: "FinOps", urlCategory: "azure" },
  integrationsonazureblog: { name: "Integrations on Azure", urlCategory: "azure" },
  linuxandopensourceblog: { name: "Linux and Open Source", urlCategory: "azure" },
  machinelearningblog: { name: "Machine Learning", urlCategory: "azure" },
  messagingonazureblog: { name: "Messaging on Azure", urlCategory: "azure" },
  "mixed-reality-link": { name: "Mixed reality link", urlCategory: "azure" },
  oracleonazureblog: { name: "Oracle on Azure", urlCategory: "azure" },
  sapapplications: { name: "SAP Applications", urlCategory: "saponmicrosoft" },
  startupsatmicrosoftblog: { name: "Startups at Microsoft", urlCategory: "startupsatmicrosoft" },
  themixedrealityblog: { name: "The Mixed Reality", urlCategory: "azure" },

  // Azure Data / Databases
  adformysql: { name: "Azure Database for MySQL", urlCategory: "azuredatabases" },
  adforpostgresql: { name: "Azure Database for PostgreSQL", urlCategory: "azuredatabases" },
  azuredatablog: { name: "Azure Data", urlCategory: "azuredatabases" },
  azuredataexplorer: { name: "Azure Data Explorer", urlCategory: "azuredatabases" },
  azuredatafactoryblog: { name: "Azure Data Factory", urlCategory: "azuredatabases" },
  azuredbsupport: { name: "Azure Database Support", urlCategory: "azuredatabases" },
  azuresqlblog: { name: "Azure SQL", urlCategory: "azuredatabases" },
  azuresynapseanalyticsblog: { name: "Azure Synapse Analytics", urlCategory: "azuredatabases" },
  dataarchitectureblog: { name: "Data Architecture", urlCategory: "dataarchitecture" },
  microsoftdatamigration: { name: "Microsoft Data Migration", urlCategory: "azuredatabases" },
  modernizationbestpracticesblog: { name: "Modernization Best Practices", urlCategory: "azuredatabases" },
  sqlserver: { name: "SQL Server", urlCategory: "sql-server" },
  sqlserversupport: { name: "SQLServer Support", urlCategory: "sql-server" },
  ssis: { name: "SSIS", urlCategory: "sql-server" },

  // Microsoft 365
  accessblog: { name: "Access", urlCategory: "microsoft365" },
  excelblog: { name: "Excel", urlCategory: "microsoft365" },
  microsoft365businessblog: { name: "Small and Medium Business", urlCategory: "microsoft365" },
  microsoft365insiderblog: { name: "Microsoft 365 Insider", urlCategory: "microsoft365" },
  microsoft_365blog: { name: "Microsoft 365", urlCategory: "microsoft365" },
  microsoft_365_archive_blog: { name: "Microsoft 365 Archive", urlCategory: "content_management" },
  microsoft_365_backup_blog: { name: "Microsoft 365 Backup", urlCategory: "content_management" },
  microsoftformsblog: { name: "Microsoft Forms", urlCategory: "microsoft365" },
  modernworkappconsult: { name: "Modern Work App Consult", urlCategory: "microsoft365" },
  office365businessappsblog: { name: "Office 365 Business Apps", urlCategory: "microsoft365" },
  officeeos: { name: "Office End Of Support", urlCategory: "officeeos" },
  onedriveblog: { name: "Microsoft OneDrive", urlCategory: "onedriveforbusiness" },
  plannerblog: { name: "Planner", urlCategory: "planner" },
  projectblog: { name: "Project", urlCategory: "project" },
  projectsupport: { name: "Project Support", urlCategory: "project" },
  streamblog: { name: "Stream", urlCategory: "microsoft365" },

  // Microsoft 365 Copilot
  microsoft365copilotblog: { name: "Microsoft 365 Copilot", urlCategory: "microsoft365copilot" },
  securitycopilotblog: { name: "Microsoft Security Copilot", urlCategory: "microsoft-security" },

  // Exchange
  exchange: { name: "Exchange", urlCategory: "exchange" },

  // Outlook
  outlook: { name: "Outlook", urlCategory: "outlook" },

  // Microsoft Teams
  microsoftteamsblog: { name: "Microsoft Teams", urlCategory: "microsoftteams" },
  microsoftteamscommunityblog: { name: "Microsoft Teams Community", urlCategory: "microsoftteams" },
  microsoftteamssupport: { name: "Microsoft Teams Support", urlCategory: "microsoftteams" },
  teamsfreeblog: { name: "Microsoft Teams (free)", urlCategory: "microsoftteams" },
  skype_for_business_blog: { name: "Skype for Business", urlCategory: "skypeforbusiness" },

  // Microsoft Viva
  microsoftvivablog: { name: "Microsoft Viva", urlCategory: "microsoft-viva" },
  viva_amplify_blog: { name: "Viva Amplify", urlCategory: "microsoft-viva" },
  viva_connections_blog: { name: "Viva Connections", urlCategory: "microsoft-viva" },
  viva_engage_blog: { name: "Viva Engage", urlCategory: "microsoft-viva" },
  viva_glint_blog: { name: "Viva Glint", urlCategory: "microsoft-viva" },
  "viva_glint_partnersblog-board": { name: "Viva Glint Partnersblog board", urlCategory: "microsoft-viva" },
  viva_insights_blog: { name: "Viva Insights", urlCategory: "microsoft-viva" },
  viva_learning_blog: { name: "Viva Learning", urlCategory: "microsoft-viva" },
  "vivapulse-blog": { name: "Viva Pulse", urlCategory: "microsoft-viva" },
  "vivasales-blog": { name: "Viva Sales", urlCategory: "microsoftviva" },

  // Content Management (SharePoint etc.)
  microsoft_graph_data_connect_for_sharepo: { name: "Microsoft Graph Data Connect for SharePoint", urlCategory: "content_management" },
  sharepoint_embedded: { name: "SharePoint Embedded", urlCategory: "content_management" },
  sharepoint_premium_blog: { name: "SharePoint Premium", urlCategory: "content_management" },
  spblog: { name: "Microsoft SharePoint", urlCategory: "content_management" },

  // Microsoft Intune / Endpoints
  configurationmanagerblog: { name: "Configuration Manager", urlCategory: "microsoftintune" },
  devicemanagementmicrosoft: { name: "Device Management Microsoft", urlCategory: "microsoftintune" },
  intunecustomersuccess: { name: "Intune Customer Success", urlCategory: "microsoftintune" },
  microsoftintuneblog: { name: "Microsoft Intune", urlCategory: "microsoftintune" },
  systemcenterblog: { name: "System Center", urlCategory: "systemcenter" },

  // Security
  azurepurviewblog: { name: "Azure Purview", urlCategory: "microsoft-security" },
  coreinfrastructureandsecurityblog: { name: "Core Infrastructure and Security", urlCategory: "microsoft-security" },
  defenderexternalattacksurfacemgmtblog: { name: "Defender External Attack Surface Mgmt", urlCategory: "microsoft-security" },
  defenderthreatintelligence: { name: "Defender Threat Intelligence", urlCategory: "microsoft-security" },
  "microsoft-entra-blog": { name: "Microsoft Entra", urlCategory: "microsoft-security" },
  "microsoft-security-baselines": { name: "Microsoft Security Baselines", urlCategory: "microsoft-security" },
  "microsoft-security-blog": { name: "Microsoft Security", urlCategory: "microsoft-security" },
  microsoftdefenderatpblog: { name: "Microsoft Defender ATP", urlCategory: "microsoft-security" },
  microsoftdefendercloudblog: { name: "Microsoft Defender Cloud", urlCategory: "microsoft-security" },
  microsoftdefenderforoffice365blog: { name: "Microsoft Defender for Office 365", urlCategory: "microsoft-security" },
  microsoftdefenderiotblog: { name: "Microsoft Defender IoT", urlCategory: "microsoft-security" },
  microsoftsecurityexperts: { name: "Microsoft Security Experts", urlCategory: "microsoft-security" },
  microsoftsentinelblog: { name: "Microsoft Sentinel", urlCategory: "microsoft-security" },
  microsoftthreatprotectionblog: { name: "Microsoft Defender XDR", urlCategory: "microsoft-security" },
  "vulnerability-management": { name: "Vulnerability Management", urlCategory: "microsoft-security" },

  // Windows
  "fslogix-blog": { name: "FSLogix", urlCategory: "windows" },
  "sysinternals-blog": { name: "Sysinternals", urlCategory: "windows" },
  "windows-admin-center-blog": { name: "Windows Admin Center", urlCategory: "windows" },
  "windows-itpro-blog": { name: "Windows IT Pro", urlCategory: "windows" },
  windowsdriverdev: { name: "Windows Driver Dev", urlCategory: "windows" },
  windowshardwarecertification: { name: "Windows Hardware Certification", urlCategory: "winhec-online" },

  // Windows Server
  containers: { name: "Containers", urlCategory: "windows-server" },
  networkingblog: { name: "Networking", urlCategory: "windows-server" },

  // FastTrack
  fasttrackblog: { name: "Fast Track", urlCategory: "fasttrack" },
  fasttrackforazureblog: { name: "Fast Track for Azure", urlCategory: "fasttrack" },

  // Partner Community
  "partnermarketingasaserviceblog-board": { name: "Partner Marketing as a Service", urlCategory: "partnercommunity" },
  partnernews: { name: "Partner News", urlCategory: "partnercommunity" },

  // Communities
  communitynewsdesk: { name: "Community News Desk", urlCategory: "communitynewsdesk" },
  educationblog: { name: "Education", urlCategory: "educationsector" },
  "m365gcchcommunityhubblog-board": { name: "M365 GCCH Community Hub", urlCategory: "microsoft365" },
  healthcareandlifesciencesblog: { name: "Healthcare And Life Sciences", urlCategory: "healthcareandlifesciences" },
  iltcommunicationblog: { name: "ILT Communication", urlCategory: "partnercommunity" },
  manufacturing: { name: "Manufacturing", urlCategory: "azure" },
  "marketplace-blog": { name: "Marketplace", urlCategory: "partnercommunity" },
  microsoftindustryblog: { name: "Microsoft Industry", urlCategory: "azure" },
  microsoftlearnblog: { name: "Microsoft Learn", urlCategory: "microsoftlearn" },
  "mvp-blog": { name: "Microsoft MVP Program", urlCategory: "mvp" },
  nonprofittechies: { name: "Non profit Techies", urlCategory: "microsoftfornonprofits" },
  publicsectorblog: { name: "Public Sector", urlCategory: "publicsector" },
  educatordeveloperblog: { name: "Educator Developer", urlCategory: "microsoft-learn-for-educators" },
  studentdeveloperblog: { name: "Student Developer", urlCategory: "educationsector" },

  // Hardware
  hardwaredevcenter: { name: "Hardware Dev Center", urlCategory: "winhec-online" },
  microsoftdeviceecosystemplatformblog: { name: "Microsoft Device Ecosystem Platform", urlCategory: "microsoftdeviceecosystemplatform" },
  surfaceitpro: { name: "Surface IT Pro", urlCategory: "surfacedevices" },

  // Others
  adsapiblog: { name: "Ads API", urlCategory: "bing" },
  askds: { name: "Ask Directory Services", urlCategory: "azure" },
  corporate_communications_blog: { name: "Corporate Communications", urlCategory: "corporate_communications" },
  drivingadoptionblog: { name: "Driving Adoption", urlCategory: "drivingadoption" },
  filecab: { name: "File CAB", urlCategory: "azure" },
  "iis-support-blog": { name: "IIS Support", urlCategory: "microsoft-iis" },
  iotblog: { name: "IoT", urlCategory: "iot" },
  itopstalkblog: { name: "IT Ops Talk", urlCategory: "itopstalk" },
  microsoftedgeinsider: { name: "Microsoft Edge Insider", urlCategory: "microsoftedgeinsider" },
  microsoftmechanicsblog: { name: "Microsoft Mechanics", urlCategory: "microsoftmechanics" },
  microsoftmissioncriticalblog: { name: "Microsoft Mission Critical", urlCategory: "microsoftmissioncriticalcommunityhub" },
  microsoftusbblog: { name: "Microsoft USB", urlCategory: "microsoftusb" },
  smallbasic: { name: "Small Basic", urlCategory: "azure" },
  weeklyroundupblog: { name: "Weekly Roundup", urlCategory: "azure" },
};

/**
 * Manual slug-to-boardId mappings for cases where URL path differs from board.id.
 */
const SLUG_ALIASES: Record<string, string> = {
  iltcommunicationsblog: "iltcommunicationblog",
  azuredatabasesupportblog: "azuredbsupport",
  exchangeteamblog: "exchange",
  microsoftfoundryblog: "azure-ai-foundry-blog",
  healthcareandlifesciences: "healthcareandlifesciencesblog",
};

function normalizeKey(s: string): string {
  return s.toLowerCase().replace(/[-_]/g, "");
}

export function getBlogMetadata(
  slug: string
): { name: string; urlCategory: string } | undefined {
  const slugLower = slug.toLowerCase();

  if (BLOG_METADATA[slugLower]) {
    return BLOG_METADATA[slugLower];
  }

  const withUnderscores = slugLower.replace(/-/g, "_");
  if (BLOG_METADATA[withUnderscores]) {
    return BLOG_METADATA[withUnderscores];
  }

  const normalized = normalizeKey(slug);
  if (SLUG_ALIASES[normalized]) {
    return BLOG_METADATA[SLUG_ALIASES[normalized]];
  }

  for (const [key, value] of Object.entries(BLOG_METADATA)) {
    if (normalizeKey(key) === normalized) {
      return value;
    }
  }

  return undefined;
}

export function getBlogUrl(categorySlug: string | null): string | undefined {
  if (!categorySlug) return undefined;

  const metadata = getBlogMetadata(categorySlug);
  if (metadata) {
    const blogId = findBlogId(categorySlug);
    if (blogId) {
      return `https://techcommunity.microsoft.com/category/${metadata.urlCategory}/blog/${blogId}`;
    }
  }

  return undefined;
}

function findBlogId(slug: string): string | undefined {
  const slugLower = slug.toLowerCase();

  if (BLOG_METADATA[slugLower]) return slugLower;

  const withUnderscores = slugLower.replace(/-/g, "_");
  if (BLOG_METADATA[withUnderscores]) return withUnderscores;

  const normalized = normalizeKey(slug);
  if (SLUG_ALIASES[normalized]) return SLUG_ALIASES[normalized];

  for (const key of Object.keys(BLOG_METADATA)) {
    if (normalizeKey(key) === normalized) {
      return key;
    }
  }

  return undefined;
}
