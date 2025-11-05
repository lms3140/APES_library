import { Contact } from "../components/CSCenter/Contact.jsx";
import { FaQ } from "../components/CSCenter/FaQ.jsx";
import { Notice } from "../components/CSCenter/Notice.jsx";
import { QnAForm } from "../components/CSCenter/QnAForm.jsx";
import { CSCenter } from "../pages/CSCenter/CSCenter.jsx";

export const route1 = [
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
];
