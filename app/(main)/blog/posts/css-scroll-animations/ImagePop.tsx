import clsx from 'clsx'
import Image from 'next/image'
import image from './image.jpg'
import styles from './ImagePop.module.css'

export default function Component() {
  return (
    <div className="relative h-[420px] overflow-x-hidden overflow-y-scroll">
      <div className="mb-4 w-full px-4 py-3 text-xl font-bold">Lorem AI</div>

      <div className="flex flex-col gap-3 p-4 pt-0">
        <p>
          Suspendisse luctus gravida sapien eu tincidunt. Vivamus laoreet arcu
          ut sodales scelerisque. Nam venenatis ullamcorper felis vel blandit.
          Vestibulum neque libero, fermentum a tortor vel, convallis fermentum
          est. Fusce porttitor interdum sem, in placerat nisl finibus ut. Nulla
          facilisi. Praesent sollicitudin quis eros quis faucibus. Nam vel
          sollicitudin nisl. Mauris gravida facilisis massa, vitae aliquet urna
          ornare vitae. Nullam gravida quam dui, sed blandit urna mollis sed.
        </p>

        <p>
          Vivamus egestas auctor dui ut elementum. Integer id sem varius,
          fringilla nibh at, semper ante. Aliquam erat volutpat. Nulla facilisi.
          Morbi ac sapien sed purus consequat volutpat. Suspendisse nec nulla
          vel augue sollicitudin finibus ac tempor ligula. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae; In
          lobortis est mauris, et imperdiet elit tempus eu. Vivamus lectus
          justo, molestie a ullamcorper et, fringilla ut turpis. Sed dictum
          efficitur odio non consequat. Mauris volutpat molestie felis. Sed at
          laoreet justo.
        </p>

        <Image
          alt="Placeholder"
          className={clsx('h-64', styles.image)}
          src={image}
        />

        <p>
          Quisque eleifend iaculis odio, euismod malesuada dui pellentesque nec.
          Nullam id accumsan risus. Nam id venenatis diam. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Nunc fermentum tempor nulla
          sed finibus. Suspendisse dolor augue, commodo quis quam vel, pharetra
          lacinia leo. Suspendisse mollis neque eget eleifend cursus. Vestibulum
          nunc orci, tristique a suscipit convallis, vehicula et arcu. Praesent
          venenatis tellus vitae massa hendrerit, id auctor lorem tristique.
        </p>
      </div>
    </div>
  )
}
