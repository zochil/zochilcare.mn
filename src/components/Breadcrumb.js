import Link from 'next/link'
import classNames from 'classnames'

function Breadcrumb ({ title, items = [1] }) {
  return (
    <div className='w-full px-3 py-4 pt-8 md:container md:pt-1'>
      <ol className='flex list-reset text-grey-dark'>
        {items.map((item, index) => (
          <li
            key={`bi_${index}`}
            className={classNames('text-gray-600 text-xs font-normal pr-2 breadcrumb-item truncate', {
              active: item.active
            })}
          >
            {item.active ? (
              item.title
            ) : (
              <Link href={item.url}>
                <a> {item.title}</a>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Breadcrumb
