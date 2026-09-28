// Shared page header: eyebrow → title → description → optional actions.
// Gives every page the same hierarchy.
function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="td-animate-in mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b2c]">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-fraunces text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#aaa8a3]">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
