import { Link } from 'react-router-dom';
interface BreadcrumbLink {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  breadcrumbLinks: BreadcrumbLink[];
  pageName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbLinks,
  pageName,
}) => {
  return (
    <div className="mb-6 flex justify-between">
      {/* Breadcrumb Navigation */}
      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumbLinks.map((link, index) => (
            <li key={index}>
              <Link className="font-medium text-[20px]" to={link.path}>
                {link.label} {index < breadcrumbLinks.length - 1 && '/'}
              </Link>
            </li>
          ))}
          <li className="font-medium text-[20px] text-primary">
            {' '}
            / {pageName}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
