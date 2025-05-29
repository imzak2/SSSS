import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PrivacyModal({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information</li>
              <li>Usage data and activity logs</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Personalize your experience</li>
              <li>Improve our platform</li>
              <li>Communicate with you</li>
            </ul>

            <h2 className="text-lg font-semibold">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers</li>
              <li>Legal authorities when required</li>
              <li>Business partners with your consent</li>
            </ul>

            <h2 className="text-lg font-semibold">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information.</p>

            <h2 className="text-lg font-semibold">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-lg font-semibold">6. Cookies</h2>
            <p>We use cookies and similar technologies to enhance your experience on our platform.</p>

            <h2 className="text-lg font-semibold">7. Updates to Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes.</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}