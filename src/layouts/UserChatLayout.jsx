"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { loadProjects } from "@/services/project";

export default function UserChatLayout({
  children,
  projectName,
  projectid,
  userid,
  currentProject,
  setCurrentProject,
}) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await loadProjects(userid);
      setProjects(response.projectList);
      console.log(response.projectList);

      // set current project
      const cur = response.projectList.find(
        (project) => project.projectid === projectid
      );
      setCurrentProject(cur);
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full h-full flex">
      <motion.nav
        initial={{ x: -100, opacity: 0 }} // Initially set x position to -300 (offscreen to the left) and opacity to 0 (hidden)
        animate={{ x: 0, opacity: 1 }} // Animate x position to 0 (fully visible) and opacity to 1 (fully visible)
        transition={{ duration: 0.7 }} // Set transition duration to 0.5 seconds
        className=""
      >
        <Sidebar
          userid={userid}
          projects={projects}
          curProject={currentProject}
        />
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }} // Initially set opacity to 0 (hidden)
        animate={{ opacity: 1 }} // Animate opacity to 1 (fully visible)
        transition={{ duration: 1 }} // Set transition duration to 0.5 seconds
        className="flex flex-col justify-center px-4 py-4 w-full"
      >
        <header className="">
          <Link
            className="w-full h-full flex items-center justify-start"
            href="/chat"
          >
            <span className="text-2xl">Dylan</span>
          </Link>
        </header>
        <main className="grow">{children}</main>
      </motion.div>
    </div>
  );
}
