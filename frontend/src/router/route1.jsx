import { Contact } from "../components/CSCenter/Contact.jsx";
import { FaQ } from "../components/CSCenter/FaQ.jsx";
import { Notice } from "../components/CSCenter/Notice.jsx";
import { QnAForm } from "../components/CSCenter/QnAForm.jsx";
import { QnALayout } from "../components/CSCenter/QnALayout.jsx";
import { SideBar } from "../components/CSCenter/SideBar.jsx";
import { CSCenter } from "../pages/CSCenter/CSCenter.jsx";

export const route1 = [
  {
    element: <QnALayout />,
    children: [
      {
        path: "/cscenter",
        element: <CSCenter />,
      },
      {
        path: "/cscenter/faq",
        element: <FaQ />,
      },
      {
        path: "/cscenter/qna-form",
        element: <QnAForm />,
      },
      {
        path: "/cscenter/notice",
        element: <Notice />,
      },
      {
        path: "/cscenter/contact",
        element: <Contact />,
      },
    ],
  },
];
