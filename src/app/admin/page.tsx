import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  logoutAction, runSeed,
  getConfig, upsertConfigBatch,
  getEducationItems, upsertEducationItem, deleteEducationItem,
  getExperienceItems, upsertExperienceItem, deleteExperienceItem,
  getSkillItems, upsertSkillItem, deleteSkillItem,
  getProjectItems, upsertProjectItem, deleteProjectItem,
  getOrganizationItems, upsertOrganizationItem, deleteOrganizationItem,
  getPublicationItems, upsertPublicationItem, deletePublicationItem,
  getTrainingItems, upsertTrainingItem, deleteTrainingItem,
  getMessages, deleteMessage, uploadImageAction, updateItemOrders
} from "@/app/admin-actions";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard – Gita Andini CMS",
};

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/login");

  const [
    configRaw, educations, experiences, skills,
    projects, organizations, publications, trainings, messages,
  ] = await Promise.all([
    getConfig(), getEducationItems(), getExperienceItems(), getSkillItems(),
    getProjectItems(), getOrganizationItems(), getPublicationItems(), getTrainingItems(), getMessages(),
  ]);

  const config = Object.fromEntries(configRaw.map((c) => [c.key, c.value]));

  return (
    <AdminDashboard
      config={config}
      educations={educations}
      experiences={experiences}
      skills={skills}
      projects={projects}
      organizations={organizations}
      publications={publications}
      trainings={trainings}
      messages={messages}
      actions={{
        logoutAction,
        runSeed,
        upsertConfigBatch,
        upsertEducationItem,
        deleteEducationItem,
        upsertExperienceItem,
        deleteExperienceItem,
        upsertSkillItem,
        deleteSkillItem,
        upsertProjectItem,
        deleteProjectItem,
        upsertOrganizationItem,
        deleteOrganizationItem,
        upsertPublicationItem,
        deletePublicationItem,
        upsertTrainingItem,
        deleteTrainingItem,
        deleteMessage,
        uploadImageAction,
        updateItemOrders,
      }}
    />
  );
}
