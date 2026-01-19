import clsx from 'clsx'
import styles from './HeaderFade.module.css'

export default function Component() {
  return (
    <div className="relative h-[320px] overflow-y-scroll">
      <div
        className={clsx(
          'sticky top-0 mb-4 w-full px-4 py-3 text-xl font-bold',
          '[--header-fade-bg:var(--color-blue-100)]/75 dark:[--header-fade-bg:var(--color-slate-800)]/75',
          styles.header,
        )}
      >
        Lorem AI
      </div>

      <div className="flex flex-col gap-3 p-4 pt-0">
        <p>
          Ea ad non sint ex adipisicing. Sunt est magna do. Esse ex officia
          velit duis officia duis voluptate laboris id. Minim proident nostrud
          deserunt. Do aliquip tempor commodo anim exercitation consequat
          nostrud aute eiusmod ea pariatur proident. Exercitation velit
          adipisicing laborum Lorem ea ad aliqua nisi pariatur eiusmod. Sint
          pariatur elit proident proident et do. Adipisicing ex duis qui
          consectetur mollit.
        </p>

        <p>
          Cillum veniam ex eu ullamco exercitation magna dolore aliqua minim
          consectetur dolore. Lorem labore ea tempor veniam in. Irure cupidatat
          sint amet duis consectetur non cupidatat reprehenderit exercitation
          est exercitation proident consequat magna ullamco. Aliquip eiusmod
          commodo tempor mollit incididunt qui ex ipsum non nostrud cupidatat
          ipsum qui in. Laborum aliquip laboris elit. Aute aliquip incididunt
          magna sint consectetur est culpa. Lorem cillum aute commodo quis
          occaecat proident eu. Laboris nostrud excepteur mollit eu amet commodo
          et qui qui.
        </p>
      </div>
    </div>
  )
}
