'use client'

import {
  AlertDialog,
  // AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'


type Config = {
  title: string,
  description: string
  buttonConfirmLabel: string
  buttonConfirmVariant: any
  showCancelBtn?: boolean
}

type ModalConfirmationProps = {
  config: Config
  isOpen: boolean
  handleClose?: () => void
  handleConfirm?: () => void
}

const ModalConfirmation = ({
  config,
  isOpen = false,
  handleClose,
  handleConfirm
}: ModalConfirmationProps) => {
  config = {
    ...config,
    showCancelBtn: config.showCancelBtn === undefined? true : config.showCancelBtn
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ config.title }</AlertDialogTitle>
          <AlertDialogDescription>
            { config?.description }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel> */}
          {
            config?.showCancelBtn? (
              <Button variant='outline' onClick={handleClose}>Cancel</Button>
            ) : ''
          }
          
          <Button 
            variant={config?.buttonConfirmVariant}
            onClick={handleConfirm}
          >
            { config?.buttonConfirmLabel || 'Confirm'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalConfirmation