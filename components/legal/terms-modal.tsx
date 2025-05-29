import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TermsModal({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p>By accessing and using KaliumLabs, you agree to be bound by these Terms of Service.</p>

            <h2 className="text-lg font-semibold">2. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

            <h2 className="text-lg font-semibold">3. Acceptable Use</h2>
            <p>You agree to use the platform only for lawful purposes and in accordance with these Terms.</p>

            <h2 className="text-lg font-semibold">4. Content and Conduct</h2>
            <p>Users must not upload, share, or create content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violates any applicable laws</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains malicious code or exploits</li>
              <li>Harasses or discriminates against others</li>
            </ul>

            <h2 className="text-lg font-semibold">5. Intellectual Property</h2>
            <p>All content and materials available on KaliumLabs are protected by intellectual property rights.</p>

            <h2 className="text-lg font-semibold">6. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our services for violations of these Terms.</p>

            <h2 className="text-lg font-semibold">7. Changes to Terms</h2>
            <p>We may modify these Terms at any time. Continued use of the platform constitutes acceptance of modified Terms.</p>

            <h2 className="text-lg font-semibold">8. Limitation of Liability</h2>
            <p>KaliumLabs is not liable for any indirect, incidental, or consequential damages.</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}